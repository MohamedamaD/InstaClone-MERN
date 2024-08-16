const jwt = require("jsonwebtoken");
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const accessTokenExpiration = process.env.JWT_EXPIRES_IN;
const refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRES_IN;

const generateAccessToken = (payload) => {
  return jwt.sign(payload, accessSecret, {
    expiresIn: accessTokenExpiration,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: refreshTokenExpiration,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, accessSecret);
};
const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshSecret);
};



module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
