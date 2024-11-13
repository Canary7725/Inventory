const Supplier = require("../models/Supplier")
// Create a new supplier
const createSupplier = async (req, res) => {
  try {
    const { municipality, product, quantity, requestId } = req.body;
    const supplier = await Supplier.create( req.body );
    res.status(201).json({ message: "Supplier created", data: supplier });
  } catch (error) {
    res.status(500).json({ message: "Error creating supplier", error: error.message });
  }
};

// Get suppliers by requestId
const getSuppliersByRequestId = async (req, res) => {
  try {
    const { requestId } = req.params;
    const suppliers = await Supplier.findAll({ where: { requestId } });
    if (suppliers.length === 0) {
      return res.status(404).json({ message: "No suppliers found for this request" });
    }
    res.json({ data: suppliers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error: error.message });
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
    res.status(500).json({ message: "Error deleting supplier", error: error.message });
  }
};

module.exports = { createSupplier, getSuppliersByRequestId, deleteSupplier };
