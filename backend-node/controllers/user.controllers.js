const { User, Save, Post } = require("../models");
const sendMail = require("../mails/nodemailer");
const { generateRefreshToken, generateAccessToken } = require("../utils/JWT");
const userValidations = require("../validations/user.validation");
const { Op } = require("sequelize");
const crypto = require("crypto");
const { generateOTP, OTP_HTML, RESET_HTML } = require("../utils/OTP");
const userAttributes = ["avatar", "id", "bio", "email", "name", "username"];

async function login(req, res) {
  try {
    const { error, value } = userValidations.UserLogin.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ where: { email: value.email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else if (!user?.isVerified) {
      return res.status(401).json({
        message: "email not verified yet please register and verify email",
      });
    }

    const isMatch = await user.verifyPassword(value.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userData = user.toJSON();

    delete userData.password;
    delete userData.refreshToken;
    delete userData.otpCode;
    delete userData.otpExpiresAt;
    delete userData.isVerified;

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken({ userId: userData.id });

    await user.update({ refreshToken });
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      http: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "logged in successfully", accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function register(req, res) {
  try {
    const { error, value } = userValidations.CreateUser.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let user = await User.findOne({ where: { email: value.email } });
    // first check if user is already registered
    if (user) {
      if (user.isVerified) {
        return res.status(400).json({
          message:
            "Email already exists. Please log in or change your information.",
        });
      } else {
        // user exist but not verified yet so generate a new otp and send it
        await user.destroy();
      }
    }

    // if user not exist so check data and create a new one
    const usernameExist = await User.findOne({
      where: { username: value.username },
    });
    if (usernameExist) {
      return res.status(400).json({
        message: "Username already exists. try another one.",
      });
    }

    const otpCode = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    user = await User.create({ ...value, otpCode, otpExpiresAt });

    await sendMail(
      value.email,
      "Your OTP for Verification",
      "",
      OTP_HTML(otpCode, value.email)
    );

    res.status(201).json({
      message: "otp generated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token found" });
    }

    const user = await User.findOne({ where: { refreshToken } });
    if (user) {
      await user.update({ refreshToken: null });
    }

    res.clearCookie("refreshToken", { httpOnly: true, secure: false });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during logout" });
  }
}
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ error: "this email not exist" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `${process.env.CLIENT_ORIGIN}/reset-password?token=${resetToken}&email=${email}`;

    await sendMail(
      email,
      "Password Reset",
      `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      RESET_HTML(resetLink)
    );

    res
      .status(200)
      .json({ message: "Password reset email sent", sendMail: true });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function resetPassword(req, res) {
  try {
    const { token, email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
        resetToken: token,
        isVerified: true,
        resetTokenExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "expired token" });
    }

    await user.update({
      password,
      resetToken: null,
      resetTokenExpires: null,
    });
    await user.save();

    res
      .status(200)
      .json({ message: "Password has been reset successfully", user });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
    });
  }
}
async function verifyOTP(req, res) {
  try {
    const { email, otpCode } = req.body;
    const user = await User.findOne({
      where: {
        email,
        otpCode,
        otpExpiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });
    if (!user) return res.status(400).json({ message: "OTP Code is expired" });
    user.otpCode = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    const userData = user.toJSON();

    // to delete sensitive information
    delete userData.password;
    delete userData.refreshToken;
    delete userData.otpCode;
    delete userData.otpExpiresAt;
    delete userData.isVerified;

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken({ userId: userData.id });

    await user.update({ refreshToken });
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      http: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function getUserSave(req, res) {
  try {
    const userId = req.params.id;
    const saves = await Save.findAll({
      where: { userId },
      include: [
        {
          model: Post,
          attributes: ["media", "caption", "id"],
          include: [{ model: User, attributes: ["avatar", "id"] }],
        },
      ],
    });
    res.status(200).json(saves);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function getUserByID(req, res) {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      attributes: userAttributes,
      include: [
        { model: User, as: "Following" },
        { model: User, as: "Followers" },
      ],
    });
    const posts = await Post.findAll({ where: { userId: id } });
    res.status(200).json({ user, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await User.findByPk(id, {
      attributes: userAttributes,
    });

    await user.update(data);
    await user.save();

    const userData = user.toJSON();

    delete userData.password;
    delete userData.refreshToken;
    delete userData.otpCode;
    delete userData.otpExpiresAt;
    delete userData.isVerified;

    res.status(200).json({ message: "user updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function userSearch(req, res) {
  try {
    const searchQuery = req.query.searchQuery || "";
    const users = await User.findAll({
      attributes: userAttributes,
      order: [["createdAt", "DESC"]],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
          {
            username: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
        ],
      },
    });

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function follow(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    const userToFollowId = req.params.id;
    await user.follow(userToFollowId);
    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function unfollow(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    const userToUnfollowId = req.params.id;
    await user.unfollow(userToUnfollowId);
    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function isFollowing(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    const userId = req.params.id;
    const isFollowing = await user.isFollowing(userId);

    return res.status(200).json({ isFollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login,
  register,
  logout,
  getUserSave,
  getUserByID,
  updateUser,
  forgotPassword,
  resetPassword,
  verifyOTP,
  userSearch,
  follow,
  unfollow,
  isFollowing,
};
