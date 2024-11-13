require('dotenv').config();
const express = require('express');
require("./models/association");


const authRoutes = require('./routes/authRoutes');
const requestRoutes=require('./routes/requestsRoute')
const productionRoutes=require("./routes/productionRoutes")
const policyRoutes=require("./routes/policiesRoutes")
const complaintsRoutes =require("./routes/complaintsRoute")
const supplierRoutes = require("./routes/supplierRoutes")

const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;



// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/production',productionRoutes );
app.use('/api/policy',policyRoutes );
app.use('/api/complaint',complaintsRoutes );
app.use('/api/supplier',supplierRoutes );



sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
