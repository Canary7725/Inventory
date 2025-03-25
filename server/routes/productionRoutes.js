const express = require("express");
const router = express.Router();
const {
  createProduction,
  getAllProduction,
  getProductionById,
  getProductionByUser,
  updateProduction,
  deleteProduction,
  getVegetables,
  getHighestProducingVegetable,
  getProductionByVegetable,
  getHistoricalData,
  predictFutureData,
} = require("../controllers/productionController");

router.post("/create", createProduction);
router.get("/", getAllProduction);
router.get("/vegetables", getVegetables);
router.get("/user/:id", getProductionByUser);
router.get("/highest", getHighestProducingVegetable);
router.get("/:id", getProductionById);
router.get("/production-data/:vegetableName", getProductionByVegetable);
router.put("/:id", updateProduction);
router.delete("/:id", deleteProduction);
router.get("/historical/:vegetableName", getHistoricalData);
router.get("/forecast/predict/:vegetableName", predictFutureData);
module.exports = router;
