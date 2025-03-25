const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSuppliersByRequestId,
  deleteSupplier,
  updateSupplierStatus,
} = require("../controllers/supplierController");

router.post("/create", createSupplier);
router.get("/:requestId", getSuppliersByRequestId);
router.delete("/:id", deleteSupplier);
router.put("/:id/status", updateSupplierStatus);

module.exports = router;
