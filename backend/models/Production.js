const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Production = sequelize.define("Production", {
  wardNo: { type: DataTypes.STRING, allowNull: false },
  vegetableName: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.STRING, allowNull: false },
},{
  timestamps:true
});

Production.belongsTo(User, { foreignKey: "userId" });

module.exports = Production;
