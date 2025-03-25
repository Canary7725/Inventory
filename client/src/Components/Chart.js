import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Chart = ({ productionData }) => {
  // Ensure productionData is an array before mapping
  if (!productionData || productionData.length === 0) {
    return (
      <div className="p-6 bg-white w-full rounded-xl shadow">
        <p>No data available for the selected vegetable.</p>
      </div>
    );
  }

  // Extract data for the chart
  const labels = productionData.map((item) => item.month);
  const quantityData = productionData.map((item) =>
    parseInt(item.totalQuantity, 10)
  );
  const demandData = productionData.map((item) =>
    parseInt(item.totalLocalDemand, 10)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Quantity",
        data: quantityData,
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#34D399",
      },
      {
        label: "Local Demand",
        data: demandData,
        borderColor: "#F87171",
        backgroundColor: "rgba(248, 113, 113, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#F87171",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white w-full rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Production vs Local Demand</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
