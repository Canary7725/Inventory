const sequelize = require("../config/db");
const { Op } = require("sequelize");
const { fn, col } = sequelize;
const User = require("../models/User");
const Production = require("../models/Production");
const { LinearRegression } = require("simple-statistics"); // Use a simple statistics library

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

const getProductionByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch all production records for the specified userId
    const productions = await Production.findAll({
      where: { userId }, // Filter by userId
      order: [["createdAt", "DESC"]], // Optional: order by creation date
    });

    // Return the data
    res.json({ data: productions });
  } catch (error) {
    console.error("Error fetching production data:", error);
    res.status(500).json({
      message: "Error fetching production data",
      error: error.message,
    });
  }
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
      attributes: ["id"],
      where: {
        role: "ward",
        localgov: username,
      },
    });

    const wardUserIds = wardUsers.map((user) => user.id);

    if (wardUserIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No ward users found for this local user" });
    }

    // Fetch top 3 highest vegetable productions for the ward users
    const highestProductions = await Production.findAll({
      where: {
        userId: wardUserIds, // Correct this if needed based on the actual field in Production
      },
      attributes: [
        "vegetableName",
        [
          sequelize.fn(
            "SUM",
            sequelize.cast(sequelize.col("quantity"), "INTEGER")
          ),
          "totalQuantity",
        ], // Cast to INTEGER
      ],
      group: ["vegetableName"],
      order: [
        [
          sequelize.fn(
            "SUM",
            sequelize.cast(sequelize.col("quantity"), "INTEGER")
          ),
          "DESC",
        ],
      ], // Cast here too
      limit: 3,
    });
    res.json(highestProductions);
  } catch (error) {
    console.error("Error fetching highest production:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
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

const getProductionByVegetable = async (req, res) => {
  const { vegetableName } = req.params;

  // Define months array at the beginning
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const productionData = await Production.findAll({
      where: { vegetableName },
      attributes: [
        "userId",
        [
          sequelize.fn(
            "EXTRACT",
            sequelize.literal('MONTH FROM "Production"."createdAt"')
          ),
          "month",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.cast(sequelize.col("quantity"), "INTEGER")
          ),
          "totalQuantity",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.cast(sequelize.col("localDemand"), "INTEGER")
          ),
          "totalLocalDemand",
        ],
      ],
      include: [
        {
          model: User,
          attributes: ["localgov"],
          required: true,
        },
      ],
      group: [
        "Production.userId",
        "User.id",
        "User.localgov",
        sequelize.fn(
          "EXTRACT",
          sequelize.literal('MONTH FROM "Production"."createdAt"')
        ),
      ],
      order: [
        sequelize.fn(
          "EXTRACT",
          sequelize.literal('MONTH FROM "Production"."createdAt"')
        ),
      ],
    });

    // Aggregate the data by month
    const monthlyAggregates = productionData.reduce((acc, item) => {
      const monthIndex = parseInt(item.dataValues.month) - 1;
      const monthKey = monthIndex.toString();

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: months[monthIndex],
          totalQuantity: 0,
          totalLocalDemand: 0,
          users: [],
        };
      }

      // Add to monthly totals
      acc[monthKey].totalQuantity += parseInt(item.dataValues.totalQuantity);
      acc[monthKey].totalLocalDemand += parseInt(
        item.dataValues.totalLocalDemand
      );

      // Store user details
      acc[monthKey].users.push({
        userId: item.dataValues.userId,
        localgov: item.User.localgov,
        quantity: parseInt(item.dataValues.totalQuantity),
        localDemand: parseInt(item.dataValues.totalLocalDemand),
      });

      return acc;
    }, {});

    // Convert to array and sort by month
    const chartData = Object.values(monthlyAggregates).sort(
      (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
    );

    res.json(chartData);
  } catch (error) {
    console.error("Error fetching production data:", error);
    res.status(500).json({
      message: "Error fetching production data",
      error: error.message,
    });
  }
};

const getHistoricalData = async (req, res) => {
  const { vegetableName } = req.params;

  try {
    const productionData = await Production.findAll({
      where: { vegetableName },
      attributes: [
        [
          Production.sequelize.fn(
            "EXTRACT",
            Production.sequelize.literal('MONTH FROM "Production"."createdAt"')
          ),
          "month",
        ],
        [
          Production.sequelize.fn(
            "SUM",
            Production.sequelize.cast(
              Production.sequelize.col("quantity"),
              "NUMERIC"
            )
          ),
          "quantity",
        ],
        [
          Production.sequelize.fn(
            "SUM",
            Production.sequelize.cast(
              Production.sequelize.col("localDemand"),
              "NUMERIC"
            )
          ),
          "demand",
        ],
        "userId", // Add userId from Production
      ],
      include: [
        {
          model: User,
          attributes: ["localgov"], // Include localgov from User
          required: true,
        },
      ],
      group: [
        Production.sequelize.fn(
          "EXTRACT",
          Production.sequelize.literal('MONTH FROM "Production"."createdAt"')
        ),
        "userId", // Add to group by
        "User.id", // Need to include this for the join
        "User.localgov", // And this
      ],
      order: [
        Production.sequelize.fn(
          "EXTRACT",
          Production.sequelize.literal('MONTH FROM "Production"."createdAt"')
        ),
      ],
    });

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedData = productionData.map((item) => {
      const monthIndex = parseInt(item.dataValues.month) - 1;
      return {
        month: months[monthIndex],
        month_index: parseInt(item.dataValues.month),
        quantity: parseFloat(item.dataValues.quantity),
        demand: parseFloat(item.dataValues.demand),
        userId: item.dataValues.userId,
        localgov: item.User.localgov, // Access localgov from the included User model
      };
    });

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({
      message: "Error fetching historical data",
      error: error.message,
    });
  }
};

/**
 * Predict future production and demand
 */
// Import ARIMA correctly
const ARIMA = require("arima");

const predictFutureData = async (req, res) => {
  const { vegetableName } = req.params;

  try {
    // Fetch production data (keeping your existing query)
    const productionData = await Production.findAll({
      where: { vegetableName },
      attributes: [
        [
          Production.sequelize.fn(
            "EXTRACT",
            Production.sequelize.literal('MONTH FROM "createdAt"')
          ),
          "month",
        ],
        [
          Production.sequelize.fn(
            "SUM",
            Production.sequelize.cast(
              Production.sequelize.col("quantity"),
              "NUMERIC"
            )
          ),
          "quantity",
        ],
        [
          Production.sequelize.fn(
            "SUM",
            Production.sequelize.cast(
              Production.sequelize.col("localDemand"),
              "NUMERIC"
            )
          ),
          "demand",
        ],
      ],
      group: [
        Production.sequelize.fn(
          "EXTRACT",
          Production.sequelize.literal('MONTH FROM "createdAt"')
        ),
      ],
      order: [
        Production.sequelize.fn(
          "EXTRACT",
          Production.sequelize.literal('MONTH FROM "createdAt"')
        ),
      ],
    });

    // Basic data validation
    if (!productionData || productionData.length === 0) {
      return res.status(404).json({
        message: "No production data found for prediction",
      });
    }

    // Format data
    const formattedData = productionData
      .map((item) => ({
        month: Number(item.dataValues.month),
        quantity: Number(item.dataValues.quantity || 0),
        demand: Number(item.dataValues.demand || 0),
      }))
      .filter(
        (item) =>
          !isNaN(item.month) && !isNaN(item.quantity) && !isNaN(item.demand)
      );

    if (formattedData.length < 3) {
      return res.status(400).json({
        message: "Need at least 3 data points for prediction",
      });
    }

    // Prepare time series data
    const quantityTimeSeries = formattedData.map((item) => item.quantity);
    const demandTimeSeries = formattedData.map((item) => item.demand);

    // Get appropriate parameters based on data length
    const getArimaParams = (dataLength) => {
      if (dataLength < 6) {
        return { p: 1, d: 0, q: 0 }; // Simpler model for very short series
      } else if (dataLength < 12) {
        return { p: 1, d: 1, q: 0 }; // Moderate complexity
      }
      return { p: 1, d: 1, q: 1 }; // Default parameters for longer series
    };

    const quantityParams = getArimaParams(quantityTimeSeries.length);
    const demandParams = getArimaParams(demandTimeSeries.length);

    // Create and train ARIMA models - corrected syntax
    const quantityModel = new ARIMA(quantityParams).train(quantityTimeSeries);
    const demandModel = new ARIMA(demandParams).train(demandTimeSeries);

    // Adjust forecast length based on data length
    const maxForecastPeriods = Math.min(4, Math.ceil(formattedData.length / 2));
    const [quantityForecast, quantityErr] =
      quantityModel.predict(maxForecastPeriods);
    const [demandForecast, demandErr] = demandModel.predict(maxForecastPeriods);

    // Calculate prediction intervals with adjusted confidence
    const confidenceLevel = formattedData.length >= 12 ? 1.96 : 1.645; // 95% vs 90% confidence
    const predictions = Array(maxForecastPeriods)
      .fill()
      .map((_, index) => {
        const month = formattedData[formattedData.length - 1].month + index + 1;
        return {
          month,
          predictedQuantity: Math.max(
            0,
            Number(quantityForecast[index].toFixed(2))
          ),
          quantityLowerBound: Math.max(
            0,
            Number(
              (quantityForecast[index] - confidenceLevel * quantityErr).toFixed(
                2
              )
            )
          ),
          quantityUpperBound: Number(
            (quantityForecast[index] + confidenceLevel * quantityErr).toFixed(2)
          ),
          predictedDemand: Math.max(
            0,
            Number(demandForecast[index].toFixed(2))
          ),
          demandLowerBound: Math.max(
            0,
            Number(
              (demandForecast[index] - confidenceLevel * demandErr).toFixed(2)
            )
          ),
          demandUpperBound: Number(
            (demandForecast[index] + confidenceLevel * demandErr).toFixed(2)
          ),
          reliability: calculateReliabilityScore(formattedData.length),
        };
      });

    // Calculate reliability score based on data length
    function calculateReliabilityScore(dataLength) {
      if (dataLength >= 12) return 1;
      if (dataLength >= 6) return 0.7;
      return 0.4;
    }

    // Calculate simple forecast accuracy metrics
    const calculateMetrics = (actual, predicted) => {
      const mse =
        actual.reduce(
          (sum, val, i) => sum + Math.pow(val - predicted[i], 2),
          0
        ) / actual.length;
      const rmse = Math.sqrt(mse);
      const mae =
        actual.reduce((sum, val, i) => sum + Math.abs(val - predicted[i]), 0) /
        actual.length;
      return {
        rmse: Number(rmse.toFixed(2)),
        mae: Number(mae.toFixed(2)),
      };
    };

    const [quantityFit] = quantityModel.predict(quantityTimeSeries.length);
    const [demandFit] = demandModel.predict(demandTimeSeries.length);

    const modelMetrics = {
      quantity: calculateMetrics(quantityTimeSeries, quantityFit),
      demand: calculateMetrics(demandTimeSeries, demandFit),
      quantityParams,
      demandParams,
      dataQualityWarning:
        formattedData.length < 12
          ? "Limited historical data available. Predictions may be less reliable."
          : null,
    };

    res.json({
      historicalData: formattedData,
      predictions,
      modelMetrics,
      message: `Using ARIMA model with ${formattedData.length} data points`,
      reliabilityWarning:
        formattedData.length < 12
          ? "Warning: Using less than 12 months of data may result in reduced prediction accuracy"
          : null,
    });
  } catch (error) {
    console.error("Error in ARIMA prediction:", error);
    res.status(500).json({
      message: "Error predicting data with ARIMA model",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
module.exports = {
  createProduction,
  getAllProduction,
  getProductionById,
  getProductionByUser,
  getVegetables,
  updateProduction,
  deleteProduction,
  getHighestProducingVegetable,
  getProductionByVegetable,
  getHistoricalData,
  predictFutureData,
};
