const Sequelize = require("sequelize");
const db = require("../config/database");

const UserModel = require("./user");
const PostModel = require("./post");
const saveModel = require("./save");
const likeModel = require("./like");
const commentModel = require("./comment");
const followModel = require("./follow");

// initialize models
const User = UserModel(db, Sequelize);
const Post = PostModel(db, Sequelize);
const Save = saveModel(db, Sequelize);
const Like = likeModel(db, Sequelize);
const Comment = commentModel(db, Sequelize);
const Follow = followModel(db, Sequelize);

// define relations
/*
  -- User 1 -> M Post \ Post 1 -> 1 User \ 1 to Many
  -- Post 1 -> M Comment \ Comment 1 -> M Post \ Many to Many 
  -- User 1 Like -> M Post \ Post 1 Liked -> M User
  -- User 1 Save -> M Post \ Post 1 Saved -> M User
 */

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Post.hasMany(Comment, { foreignKey: "postId" });

Comment.belongsTo(User, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Like, { foreignKey: "userId" });
Post.hasMany(Like, { foreignKey: "postId" });

Like.belongsTo(User, { foreignKey: "userId" });
Like.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Save, { foreignKey: "userId" });
Post.hasMany(Save, { foreignKey: "postId" });

Save.belongsTo(User, { foreignKey: "userId" });
Save.belongsTo(Post, { foreignKey: "postId" });

// self relationship through follow relationship
User.belongsToMany(User, {
  through: Follow,
  as: "Followers",
  foreignKey: "followeeId",
});

User.belongsToMany(User, {
  through: Follow,
  as: "Following",
  foreignKey: "followerId",
});

// create tables if any

module.exports = { User, Post, Save, Like, Comment, db };
