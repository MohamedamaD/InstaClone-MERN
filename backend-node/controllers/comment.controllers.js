const { Comment, Post, User } = require("../models");

async function createComment(req, res) {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;
    const comment = await Comment.create({ userId, postId, content });

    res.status(201).json({ message: "comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getPostComments(req, res) {
  try {
    const { postId } = req.query;

    const post = await Post.findByPk(postId, {
      include: {
        model: Comment,
        include: User,
      },
      order: [[Comment, "createdAt", "DESC"]],
    });
    res.status(201).json({ comments: post.Comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createComment, getPostComments };
