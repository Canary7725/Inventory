const Requests = require("../models/Requests");
const User = require("../models/User")

const createRequest = async (req, res) => {

  const request = await Requests.create(req.body);
  res.status(201).json({ message: "Request created", data: request });
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Requests.findAll({
      include: [{
        model: User,
        as:"user",
        attributes: ['username'], // Include only the username field from User model
      }]
    });
    res.json({ data: requests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error: error.message });
  }
};
const getRequestById = async (req, res) => {
  const request = await Requests.findByPk(req.params.id);
  res.json({ data: request });
};

const updateRequest = async (req, res) => {
  await Requests.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Request updated" });
};

const deleteRequest = async (req, res) => {
  await Requests.destroy({ where: { id: req.params.id } });
  res.json({ message: "Request deleted" });
};

module.exports = { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest };
