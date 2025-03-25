// backend/config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventory_db", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to PostgreSQL database."))
  .catch((err) => console.error("Unable to connect to PostgreSQL:", err));

module.exports = sequelize;
