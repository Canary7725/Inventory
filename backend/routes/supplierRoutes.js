const express = require("express");
const router = express.Router();
const { createSupplier, getSuppliersByRequestId, deleteSupplier } = require("../controllers/supplierController");

router.post("/create", createSupplier);
router.get("/:requestId", getSuppliersByRequestId);
router.delete("/:id", deleteSupplier);

module.exports = router;
