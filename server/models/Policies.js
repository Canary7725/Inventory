const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Policies = sequelize.define("Policies", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
},{
  timestamps:true
});

module.exports = Policies;
