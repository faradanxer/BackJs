const Sequelize = require("sequelize");
const { sequelize } = require("..");
const Token = require("./Token.model");
const Todo = require("./ToDo.model");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    Username: {
      type: Sequelize.STRING,
      defaultValue: "User",
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      defaultValue: "User@gmail.com",
    },
    Name: {
      type: Sequelize.STRING,
      defaultValue: "Bob",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "users" }
);
User.hasMany(Token);
Token.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Todo);
Todo.belongsTo(User, { foreignKey: "userId" });
module.exports = User;
