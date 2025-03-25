const Policies = require("../models/Policies");

const createPolicy = async (req, res) => {
  const request = await Policies.create(req.body);
  res.status(201).json({ message: "Policies created", data: request });
};

const getAllPolicies = async (req, res) => {
  const request = await Policies.findAll();
  res.json({ data: request });
};

const getPoliciesById = async (req, res) => {
  const request = await Policies.findByPk(req.params.id);
  res.json({ data: request });
};

const updatePolicies = async (req, res) => {
  await Policies.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Policies updated" });
};

const deletePolicies = async (req, res) => {
  await Policies.destroy({ where: { id: req.params.id } });
  res.json({ message: "Policies deleted" });
};

module.exports = { createPolicy, getAllPolicies, getPoliciesById, updatePolicies, deletePolicies };
