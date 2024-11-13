const express = require("express");
const router = express.Router();
const { createProduction, getAllProduction, getProductionById,updateProduction,deleteProduction, getVegetables,getHighestProducingVegetable} = require("../controllers/productionController");

router.post("/create", createProduction);
router.get("/", getAllProduction);
router.get("/vegetables", getVegetables);
router.get("/highest", getHighestProducingVegetable);
router.get("/:id", getProductionById);
router.put("/:id", updateProduction);
router.delete("/:id", deleteProduction);

module.exports = router;
