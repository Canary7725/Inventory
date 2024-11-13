const sequelize = require("../config/db")
const User = require("../models/User")
const Production = require("../models/Production")

const createProduction = async (req, res) => {
    const request = await Production.create(req.body);
    res.status(201).json({ message: "Production Added", data: request });
  };
  
const getAllProduction = async (req, res) => {
  const requests = await Production.findAll();
  res.json({ data: requests });
};

const getProductionById = async (req, res) => {
  const request = await Production.findByPk(req.params.id);
  res.json({ data: request });
};

const getVegetables = async (req, res) => {
  try {
    const vegetables = await Production.findAll({
      attributes: ["vegetableName"],
      group: ["vegetableName"],
    });
    const vegetableNames = vegetables.map((item) => item.vegetableName);
    res.json(vegetableNames);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vegetables" });
  }
};

const getHighestProducingVegetable = async (req, res) => {
  const { username } = req.query;
  console.log("Username:", username);

  try {    
    // Fetch users with role 'ward' and localgov matching the specified username
    const wardUsers = await User.findAll({
      attributes: ['id'],
      where: {
        role: 'ward',
        localgov: username,
      },
    });

    const wardUserIds = wardUsers.map((user) => user.id);


    if (wardUserIds.length === 0) {
      return res.status(404).json({ error: "No ward users found for this local user" });
    }

    // Fetch top 3 highest vegetable productions for the ward users
    const highestProductions = await Production.findAll({
      where: {
        userId: wardUserIds, // Correct this if needed based on the actual field in Production
      },
      attributes: [
        'vegetableName',
        [sequelize.fn('SUM', sequelize.cast(sequelize.col('quantity'), 'INTEGER')), 'totalQuantity'], // Cast to INTEGER
      ],
      group: ['vegetableName'],
      order: [[sequelize.fn('SUM', sequelize.cast(sequelize.col('quantity'), 'INTEGER')), 'DESC']], // Cast here too
      limit: 3,
    });
    res.json(highestProductions);
  } catch (error) {
    console.error("Error fetching highest production:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};



const updateProduction = async (req, res) => {
  await Production.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Production updated" });
};

const deleteProduction = async (req, res) => {
  await Production.destroy({ where: { id: req.params.id } });
  res.json({ message: "Production deleted" });
};

module.exports ={ createProduction, getAllProduction, getProductionById,getVegetables,updateProduction,deleteProduction, getHighestProducingVegetable}

