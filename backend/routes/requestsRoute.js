const express = require("express");
const router = express.Router();
const { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest } = require("../controllers/requestsController");

router.post("/create", createRequest);
router.get("/", getAllRequests);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

module.exports = router;
