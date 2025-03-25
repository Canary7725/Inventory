const Requests = require("../models/Requests");
const User = require("../models/User");

const createRequest = async (req, res) => {
  const request = await Requests.create(req.body);
  res.status(201).json({ message: "Request created", data: request });
};

const getAllRequests = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameters

    const requests = await Requests.findAll({
      where: userId ? { userId } : {}, // Filter by userId if provided
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"], // Include only the username field from User model
        },
      ],
    });

    // Map through requests and add a `status` field dynamically
    const requestsWithStatus = requests.map((request) => {
      const requestedQuantity = parseInt(request.requested_quantity, 10);
      const receivedQuantity = parseInt(request.received_quantity, 10);

      // Determine status
      const status =
        receivedQuantity >= requestedQuantity
          ? "Completed"
          : receivedQuantity === 0
          ? "Pending"
          : "Ongoing";

      return {
        ...request.toJSON(), // Convert Sequelize object to plain JSON
        status, // Add the dynamically calculated status
      };
    });

    res.json({ data: requestsWithStatus });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching requests", error: error.message });
  }
};

// const getAllRequests = async (req, res) => {
//   try {
//     const { userId } = req.query; // Get userId from query parameters

//     const requests = await Requests.findAll({
//       where: userId ? { userId } : {}, // Filter by userId if provided
//       include: [
//         {
//           model: User,
//           as: "user",
//           attributes: ["username"], // Include only the username field from User model
//         },
//       ],
//     });

//     res.json({ data: requests });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching requests", error: error.message });
//   }
// };

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

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
