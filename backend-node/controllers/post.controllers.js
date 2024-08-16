const { Post, User, Like, Save, Comment } = require("../models");
const { Op } = require("sequelize");

const postValidations = require("../validations/post.validation.js");

async function create(req, res) {
  try {
    const { error, value } = postValidations.createSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    value.userId = req.user.id;
    const post = await Post.create(value);
    return res.status(201).json({
      message: "post created successfully",
      post: post.toJSON(),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function getPosts(req, res) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    const { rows: posts, count } = await Post.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [["createdAt", "DESC"]],
      distinct: true,
      include: [
        { model: User },
        { model: Like, include: User },
        { model: Save, include: User },
      ],
    });

    const hasMore = page * pageSize < count;

    return res.status(200).json({ posts, hasMore });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function getPost(req, res) {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id, {
      include: [
        { model: User },
        { model: Like, include: User },
        { model: Save, include: User },
      ],
    });

    return res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function getFollowersPosts(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: {
        model: User,
        as: "Following",
        attributes: ["id"],
        include: {
          model: Post,
          include: [
            { model: User },
            { model: Like, include: User },
            { model: Save, include: User },
          ],
          order: [["updatedAt", "DESC"]],
        },
      },
    });
    const posts = user.Following.flatMap((follow) => follow.Posts);
    res.json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function updatePost(req, res) {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);

    await post.update(req.body);
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function deletePost(req, res) {
  try {
    const id = req.params.id;
    await Post.destroy({ where: { id } });

    return res.status(200).json({ message: "Delete post successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function searchPost(req, res) {
  try {
    const searchTerm = req.query.searchTerm;

    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: User },
        { model: Like, include: User },
        { model: Save, include: User },
      ],
      where: {
        [Op.or]: [
          {
            caption: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            location: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            tags: {
              [Op.contains]: [searchTerm],
            },
          },
        ],
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function likePost(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const like = await Like.create({ userId, postId });
    res.status(201).json({ message: "like created successfully", like });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function unLikePost(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    await Like.destroy({ where: { userId, postId } });
    res.status(201).json({ message: "like deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function savePost(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const save = await Save.create({ userId, postId });
    res.status(201).json({ message: "save created successfully", save });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function unSavePost(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    await Save.destroy({ where: { userId, postId } });
    res.status(201).json({ message: "Save deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  create,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  searchPost,
  savePost,
  unSavePost,
  likePost,
  unLikePost,
  getFollowersPosts,
};
