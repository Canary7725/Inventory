const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  username: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("local", "ward","central"),
    allowNull: false,
    defaultValue: "local", // Default role if not provided
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true, // File path or name can be stored here
  },
  localgov: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
