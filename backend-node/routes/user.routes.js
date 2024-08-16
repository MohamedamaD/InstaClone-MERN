const userControllers = require("../controllers/user.controllers");
const express = require("express");
const {
  validateRefreshToken,
  validateAccessToken,
} = require("../validations/token.validation");
const router = express.Router();

// auth routes
router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.post("/logout", userControllers.logout);
router.post("/verify-otp", userControllers.verifyOTP);

// restore password routes
router.post("/forgot-password", userControllers.forgotPassword);
router.post("/reset-password", userControllers.resetPassword);

// keep track user route
router.post("/refresh-token", validateRefreshToken);

// CURD Operations for user
router.get("/:id", validateAccessToken, userControllers.getUserByID);
router.put("/:id", validateAccessToken, userControllers.updateUser);

router.get("/:id/saves", validateAccessToken, userControllers.getUserSave);
router.get("/user/search", validateAccessToken, userControllers.userSearch);

// following routes
router.get(
  "/:id/is-following",
  validateAccessToken,
  userControllers.isFollowing
);
router.post("/:id/follow", validateAccessToken, userControllers.follow);
router.delete("/:id/unfollow", validateAccessToken, userControllers.unfollow);

module.exports = router;
