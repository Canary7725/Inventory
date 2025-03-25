// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {registerUser, loginUser, updateUser, deleteUser,getAllUsers,getUserById, getLocalUsers} = require('../controllers/authController');
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

router.post("/register", upload.single("document"), registerUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/locals", getLocalUsers);
router.put("/update/:id", upload.single("document"), updateUser); // Update user
router.delete("/delete/:id", deleteUser); // Delete user

// Login route
router.post('/login', loginUser);

module.exports = router;
