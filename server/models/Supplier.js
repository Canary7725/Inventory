const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Requests = require("./Requests");

const Supplier = sequelize.define(
  "Supplier",
  {
    municipality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ongoing", // Default status
    },
  },
  {
    timestamps: true,
  }
);

Supplier.belongsTo(Requests, { foreignKey: "requestId" });

module.exports = Supplier;
