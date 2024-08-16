const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controllers");
const { validateAccessToken } = require("../validations/token.validation");

router.post("/", validateAccessToken, commentController.createComment);
router.get("/", validateAccessToken, commentController.getPostComments);

module.exports = router;
