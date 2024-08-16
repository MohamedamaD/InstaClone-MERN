"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      resetTokenExpires: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },

      otpCode: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      otpExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
