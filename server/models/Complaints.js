const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Complaints = sequelize.define("Complaints", {
  message: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
},{
  timestamps:true
});

Complaints.belongsTo(User, { foreignKey: "userId" });
 
module.exports = Complaints;
