import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { jwtDecode } from "jwt-decode"; // Correct import
import LocalLayout from "./layout";
import Overview from "../../Components/Overview";
import HighestProducingVegetables from "../../Components/HighestProducingVegetables";
import Dropdown from "../../Components/Dropdown";
import Chart from "../../Components/Chart";
import ProdHTR from "../../Components/ProdHTR";

const LocalHome = () => {
  //   const [username, setUsername] = useState(null);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       try {
  //         const decodedToken = jwtDecode(token);
  //         setUsername(decodedToken.username);
  //       } catch (err) {
  //         console.error("Failed to decode token", err);
  //       }
  //     } else {
  //       navigate("/");
  //     }
  //   }, [navigate]);

  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedMunicipality, setSelectedMunicipality] =
    useState("Suryabinayak");

  const products = ["All", "Spinach", "Potato", "Tomato"];
  const municipalities = ["Suryabinayak", "Bhaktapur", "Kathmandu"];

  return (
    <div>
      <LocalLayout title="Dashboard">
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
          <Overview />
          <HighestProducingVegetables />
        </div>

        <div className="mt-6">
          <Chart />
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
      </LocalLayout>
    </div>
  );
};

export default LocalHome;
