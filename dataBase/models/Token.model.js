const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Token extends Sequelize.Model {}

Token.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    //   defaultValue:nanoid(128)
    },
  },
  { sequelize: sequelize, modelName: "token" }
);

module.exports = Token;

