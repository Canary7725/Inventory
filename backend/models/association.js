const Supplier = require("./Supplier");
const Requests = require("./Requests");

// Define associations
Supplier.belongsTo(Requests, { foreignKey: "requestId", as: "request" });
Requests.hasMany(Supplier, { foreignKey: "requestId", as: "suppliers" });

module.exports = { Supplier, Requests };
