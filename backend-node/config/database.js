const Sequelize = require("sequelize");
const config = require("./config")[process.env.NODE_ENV];

module.exports = new Sequelize(config);
