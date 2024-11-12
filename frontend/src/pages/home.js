import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { jwtDecode } from "jwt-decode"; // Correct import
import Layout from "./layout";
import ProdHTR from "../Components/ProdHTR";
import Dropdown from "../Components/Dropdown";
import Chart from "../Components/Chart";

const Home = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedMunicipality, setSelectedMunicipality] =
    useState("Suryabinayak");

  const products = ["All", "Spinach", "Potato", "Tomato"];
  const municipalities = ["Suryabinayak", "Bhaktapur", "Kathmandu"];

  return (
    <div>
      <Layout title="Dashboard">
        <div className="flex space-x-4 my-4">
          <Dropdown
            label="Product"
            options={products}
            value={selectedProduct}
            onChange={setSelectedProduct}
          />
          <Dropdown
            label="Municipality/ VDC"
            options={municipalities}
            value={selectedMunicipality}
            onChange={setSelectedMunicipality}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Overview Section */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">Overview</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Vegetables</span>
                <span className="text-green-500 font-semibold text-xl">
                  300
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Excess (%)</span>
                <span className="text-green-500 font-semibold text-xl">
                  0.8%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Productions (kg)</span>
                <span className="text-green-500 font-semibold text-xl">
                  300k+
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shortage (%)</span>
                <span className="text-green-500 font-semibold text-xl">
                  20%
                </span>
              </div>
            </div>
          </div>

          {/* Highest Producing Vegetables Section */}
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold p-4">
                Highest Producing Vegetables
              </h2>
              <a href="#" className="text-green-500 hover:underline">
                See All
              </a>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2 text-green-500 w-56 p-4">Category</th>
                  <th className="pb-2 text-green-500 w-56 p-4">Production</th>
                  <th className="pb-2 text-green-500 p-4">Increase By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 w-56 p-4">Spinach</td>
                  <td className="py-1 w-56 p-4">200,000 kg</td>
                  <td className="py-1 p-4">2.3%</td>
                </tr>
                <tr>
                  <td className="py-1 w-56 p-4">Potato</td>
                  <td className="py-1 w-56 p-4">100,000 kg</td>
                  <td className="py-1 p-4">3%</td>
                </tr>
                <tr>
                  <td className="py-1 w-56 p-4">Tomato</td>
                  <td className="py-1 w-56 p-4">20,000 kg</td>
                  <td className="py-1 w-56 p-4">1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <Chart/>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold p-4 text-gray-800">
              Production History
            </h2>
            <div className="flex items-center space-x-2">
              <select className="text-gray-600 bg-white border rounded-md px-3 py-1 focus:outline-none">
                <option>November</option>
              </select>
            </div>
          </div>
          <div className="text-green-500 font-bold w-full p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
            <span className="w-1/6">Serial No.</span>
            <span className="w-1/4">Product</span>
            <span className="w-1/5">Production</span>
            <span className="w-1/5">Demand</span>
            <span className="w-1/6">Status(%)</span>
          </div>
          <ProdHTR />
          <ProdHTR />
          <ProdHTR />
          <ProdHTR />
          <ProdHTR />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
