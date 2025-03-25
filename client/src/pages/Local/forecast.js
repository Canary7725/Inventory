import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { jwtDecode } from "jwt-decode";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "../Local/layout";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LForecast = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [selectedVegetable, setSelectedVegetable] = useState("");
  const [vegetables, setVegetables] = useState([]);
  const [error, setError] = useState(null);
  const [loggedInUserLocalGov, setLoggedInUserLocalGov] = useState(null);

  useEffect(() => {
    // Get logged in user's localgov from token
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedInUserLocalGov(decoded.username);
    }
    fetchVegetables();
  }, []);

  useEffect(() => {
    if (selectedVegetable && loggedInUserLocalGov) {
      fetchData();
    }
  }, [selectedVegetable, loggedInUserLocalGov]);

  const fetchVegetables = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/production/vegetables"
      );
      const data = await response.json();
      setVegetables(data);
      if (data.length > 0 && !selectedVegetable) {
        setSelectedVegetable(data[0]);
      }
    } catch (err) {
      setError("Failed to fetch vegetables list");
      console.error("Failed to fetch vegetables", err);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch historical data
      const historicalResponse = await fetch(
        `http://localhost:4000/api/production/historical/${selectedVegetable}`
      );
      const allHistoricalData = await historicalResponse.json();

      // Filter data for current user's localgov
      const filteredHistoricalData = allHistoricalData.filter(
        (item) => item.localgov === loggedInUserLocalGov
      );

      setHistoricalData(filteredHistoricalData);

      // Fetch predictions
      const predictionResponse = await fetch(
        `http://localhost:4000/api/production/forecast/predict/${selectedVegetable}`
      );
      const predictionData = await predictionResponse.json();

      if (predictionData.predictions) {
        setPredictedData(predictionData.predictions);
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Failed to fetch data", err);
    }
  };

  const labels = [
    ...historicalData.map((item) => item.month),
    ...predictedData.map((item) => `Month ${item.month}`),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Historical Production",
        data: historicalData
          .map((item) => item.quantity)
          .concat(predictedData.map(() => null)),
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#34D399",
      },
      {
        label: "Historical Demand",
        data: historicalData
          .map((item) => item.demand)
          .concat(predictedData.map(() => null)),
        borderColor: "#FB923C",
        backgroundColor: "rgba(251, 146, 60, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#FB923C",
      },
      {
        label: "Predicted Production",
        data: historicalData
          .map(() => null)
          .concat(predictedData.map((item) => item.predictedQuantity)),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
      },
      {
        label: "Predicted Demand",
        data: historicalData
          .map(() => null)
          .concat(predictedData.map((item) => item.predictedDemand)),
        borderColor: "#F43F5E",
        backgroundColor: "rgba(244, 63, 94, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#F43F5E",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantity",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <Layout>
        <h1 className="text-2xl font-bold mb-6">
          Forecast Production and Demand for {loggedInUserLocalGov}
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Vegetable
          </label>
          <select
            value={selectedVegetable}
            onChange={(e) => setSelectedVegetable(e.target.value)}
            className="border rounded px-3 py-2 w-full max-w-xs"
          >
            {vegetables.length === 0 && (
              <option value="">Loading vegetables...</option>
            )}
            {vegetables.map((vegetable) => (
              <option key={vegetable} value={vegetable}>
                {vegetable}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {selectedVegetable ? (
          <div className="w-full h-96">
            {historicalData.length > 0 ? (
              <Line data={data} options={options} />
            ) : (
              <div className="text-gray-500">
                No data available for {selectedVegetable} in{" "}
                {loggedInUserLocalGov}
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500">
            Select a vegetable to view forecast data
          </div>
        )}
      </Layout>
    </div>
  );
};

export default LForecast;
