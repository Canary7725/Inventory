const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Supplier = require("./Supplier");

const Requests = sequelize.define("Requests", {
  vegetableName: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true
});

Requests.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Requests;
