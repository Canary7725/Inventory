const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  getComplaintsById,
  updateComplaints,
  deleteComplaints,
} = require("../controllers/complaintsController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), createComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintsById);
router.put("/:id", updateComplaints);
router.delete("/:id", deleteComplaints);

module.exports = router;
