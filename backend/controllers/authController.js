// backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = await User.create({ username, password: hashedPassword });

    // Respond with a success message
    res.status(201).json({ message: "User registered successfully", user: { username: newUser.username } });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
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
    const token = jwt.sign({ username: user.username }, "your_jwt_secret", { expiresIn: "5h" });

    // Set the token in a cookie
    res.cookie("authToken", token, { httpOnly: true, maxAge: 18000000 }); // 1 hour expiration

    return res.status(200).json({ message: "Login successful",success:true,token });
  } catch (error) {
    // Send server error response if something went wrong
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { registerUser, loginUser };
