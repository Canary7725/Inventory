// backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, password, contact, address, role, areaName } = req.body;
  const file = req.file; // File from multer

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      contact,
      address,
      role,
      document: file ? file.path : null,
      areaName,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login function to authenticate user and set cookie
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username
    const user = await User.findOne({ where: { username } });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token with user's username as payload
    const token = jwt.sign(
      { username: user.username, role: user.role, user_id: user.id },
      "your_jwt_secret",
      { expiresIn: "5h" }
    );

    // Set the token in a cookie
    res.cookie("authToken", token, { httpOnly: true, maxAge: 18000000 }); // 1 hour expiration

    return res
      .status(200)
      .json({ message: "Login successful", success: true, token, user });
  } catch (error) {
    // Send server error response if something went wrong
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get All Users

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ message: "Fetched all users", data: users });
};

const getLocalUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "local" },
      attributes: ["username"],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch local users" });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json({ message: "Fetched user", data: user });
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params; // User ID from URL
  const { username, contact, address, role, areaName } = req.body;
  const file = req.file;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    const updatedUser = await user.update({
      username: username || user.username,
      contact: contact || user.contact,
      address: address || user.address,
      role: role || user.role,
      areaName: areaName || user.areaName,
      document: file ? file.path : user.document, // Update file path if a new file is uploaded
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params; // User ID from URL

  try {
    // Find the user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  getLocalUsers,
  loginUser,
  updateUser,
  deleteUser,
};
