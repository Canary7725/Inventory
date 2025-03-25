const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Supplier = require("./Supplier");

const Requests = sequelize.define(
  "Requests",
  {
    vegetableName: { type: DataTypes.STRING, allowNull: false },
    requested_quantity: { type: DataTypes.STRING, allowNull: false },
    received_quantity: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ongoing",
    },
  },
  {
    timestamps: true,
  }
);

Requests.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Requests;
