const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Supplier = sequelize.define("Supplier", {
  municipality: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  product: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  quantity: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
}, {
  timestamps: true,
});


module.exports = Supplier;
