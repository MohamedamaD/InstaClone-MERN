"use strict";
const { Model, where } = require("sequelize");
const { hashPassword, comparePassword } = require("../utils/hash");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async verifyPassword(password) {
      return await comparePassword(password, this.password);
    }

    async follow(userIdToFollow) {
      await sequelize.models.Follow.create({
        followerId: this.id,
        followeeId: userIdToFollow,
      });
    }
    async unfollow(userIdToUnfollow) {
      await sequelize.models.Follow.destroy({
        where: {
          followerId: this.id,
          followeeId: userIdToUnfollow,
        },
      });
    }

    async isFollowing(userId) {
      const follow = await sequelize.models.Follow.findOne({
        where: {
          followerId: this.id,
          followeeId: userId,
        },
      });

      return !!follow;
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      bio: DataTypes.STRING,

      resetToken: DataTypes.STRING,
      resetTokenExpires: DataTypes.DATE,

      otpCode: DataTypes.STRING,
      otpExpiresAt: DataTypes.DATE,
      isVerified: DataTypes.BOOLEAN,

      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await hashPassword(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await hashPassword(user.password);
          }
        },
      },
    }
  );
  return User;
};
