const express = require("express");
const router = express.Router();
const  { createPolicy, getAllPolicies, getPoliciesById, updatePolicies, deletePolicies }= require("../controllers/policiesController");

router.post("/create", createPolicy);
router.get("/", getAllPolicies);
router.get("/:id", getPoliciesById);
router.put("/:id", updatePolicies);
router.delete("/:id", deletePolicies);

module.exports = router;
