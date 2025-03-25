const Complaints = require("../models/Complaints");
const User = require("../models/User");

const createComplaint = async (req, res) => {
  const { userId, message } = req.body;

  const file = req.file; // File from multer

  const request = await Complaints.create({
    userId,
    message,
    image: file ? file.path : null,
  });
  res.status(201).json({ message: "Complaints created", data: request });
};

const getAllComplaints = async (req, res) => {
  const complaints = await Complaints.findAll({
    include: { model: User, attributes: ["username"] },
  });
  res.json({ data: complaints });
};

const getComplaintsById = async (req, res) => {
  try {
    const complaint = await Complaints.findByPk(req.params.id, {
      include: { model: User, attributes: ["username"] },
    });
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({ data: complaint });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateComplaints = async (req, res) => {
  await Complaints.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Complaints updated" });
};

const deleteComplaints = async (req, res) => {
  await Complaints.destroy({ where: { id: req.params.id } });
  res.json({ message: "Complaints deleted" });
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintsById,
  updateComplaints,
  deleteComplaints,
};
