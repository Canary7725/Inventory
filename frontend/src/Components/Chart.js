import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Chart = () => {
  const [selectedProduct, setSelectedProduct] = useState('Potato');
  const products = ['Potato', 'Tomato', 'Spinach'];

  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Production',
        data: [20000, 30000, 40000, 60000, 50000, 55000, 45000],
        borderColor: '#34D399', // Tailwind green-400
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#34D399',
      },
      {
        label: 'Demand',
        data: [25000, 35000, 38000, 65000, 52000, 57000, 46000],
        borderColor: '#ED9200', // Tailwind green-200
        backgroundColor: 'rgba(167, 243, 208, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#A7F3D0',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return ` ${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20000,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white w-full rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Demand and Production</h2>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {products.map((product, index) => (
            <option key={index} value={product}>{product}</option>
          ))}
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;