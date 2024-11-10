require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require('cors');

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
