const postControllers = require("../controllers/post.controllers.js");
const validate = require("../validations/token.validation");
const express = require("express");
const router = express.Router();

// post routes
router.get("/", validate.validateAccessToken, postControllers.getPosts);
router.get("/search", validate.validateAccessToken, postControllers.searchPost);
router.get(
  "/followers",
  validate.validateAccessToken,
  postControllers.getFollowersPosts
);
router.get("/:id", validate.validateAccessToken, postControllers.getPost);
router.post("/", validate.validateAccessToken, postControllers.create);
router.put("/:id", validate.validateAccessToken, postControllers.updatePost);
router.delete("/:id", validate.validateAccessToken, postControllers.deletePost);

router.post(
  "/:id/like",
  validate.validateAccessToken,
  postControllers.likePost
);
router.delete(
  "/:id/like",
  validate.validateAccessToken,
  postControllers.unLikePost
);

router.post(
  "/:id/save",
  validate.validateAccessToken,
  postControllers.savePost
);
router.delete(
  "/:id/save",
  validate.validateAccessToken,
  postControllers.unSavePost
);

module.exports = router;
