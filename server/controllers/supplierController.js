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

    await transaction.commit(); // Commit the transaction
    res.status(201).json({
      message: "Supplier created successfully",
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

const updateSupplierStatus = async (req, res) => {
  const { id } = req.params; // Supplier ID
  const { status } = req.body; // New status (Completed or Rejected)

  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const supplier = await Supplier.findByPk(id, { transaction });
    if (!supplier) {
      await transaction.rollback();
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Update the supplier status
    supplier.status = status;
    await supplier.save({ transaction });

    // If the status is "Completed", update the corresponding request's received_quantity
    if (status === "Completed") {
      const request = await Requests.findByPk(supplier.requestId, {
        transaction,
      });

      if (!request) {
        throw new Error("Related request not found");
      }

      const updatedReceivedQuantity =
        parseInt(request.received_quantity || 0) + parseInt(supplier.quantity);

      await request.update(
        { received_quantity: updatedReceivedQuantity },
        { transaction }
      );
    }

    await transaction.commit(); // Commit the transaction
    res.json({
      message: "Supplier status updated successfully",
      data: supplier,
    });
  } catch (error) {
    await transaction.rollback(); // Rollback on error
    res.status(500).json({
      message: "Failed to update supplier status",
      error: error.message,
    });
  }
};

module.exports = {
  createSupplier,
  getSuppliersByRequestId,
  deleteSupplier,
  updateSupplierStatus,
};
