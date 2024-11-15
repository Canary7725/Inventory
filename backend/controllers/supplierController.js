const Requests = require("../models/Requests");
const Supplier = require("../models/Supplier");

const sequelize = require("../config/db");

// Create a new supplier
const createSupplier = async (req, res) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const { municipality, product, quantity, requestId } = req.body;

    // Create the supplier entry
    const supplier = await Supplier.create(req.body, { transaction });

    // Fetch the corresponding request
    const request = await Requests.findByPk(requestId, { transaction });
    if (!request) {
      throw new Error("Request not found");
    }

    // Update the received quantity
    const updatedReceivedQuantity =
      parseInt(request.received_quantity) + parseInt(quantity);
    await request.update(
      { received_quantity: updatedReceivedQuantity },
      { transaction }
    );

    await transaction.commit(); // Commit the transaction
    res.status(201).json({
      message: "Supplier created and request updated",
      data: supplier,
    });
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of error
    res
      .status(500)
      .json({ message: "Error creating supplier", error: error.message });
  }
};

// Get suppliers by requestId
const getSuppliersByRequestId = async (req, res) => {
  try {
    const { requestId } = req.params;
    const suppliers = await Supplier.findAll({ where: { requestId } });
    if (suppliers.length === 0) {
      return res
        .status(404)
        .json({ message: "No suppliers found for this request" });
    }
    res.json({ data: suppliers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching suppliers", error: error.message });
  }
};

// Delete a supplier by ID
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    await supplier.destroy();
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting supplier", error: error.message });
  }
};

module.exports = { createSupplier, getSuppliersByRequestId, deleteSupplier };
