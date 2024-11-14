import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { jwtDecode } from "jwt-decode"; // Correct import
import LocalLayout from "./layout";
import Dropdown from "../../Components/Dropdown";

const LocalProduction = () => {
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedMunicipality, setSelectedMunicipality] =
    useState("Suryabinayak");

  const products = ["All", "Spinach", "Potato", "Tomato"];
  const municipalities = ["Suryabinayak", "Bhaktapur", "Kathmandu"];

  return (
    <div>
      <LocalLayout title="Production History">
        <div className="flex space-x-4 mt-4">
          <Dropdown
            label="Product"
            options={products}
            value={selectedProduct}
            onChange={setSelectedProduct}
          />
          <Dropdown
            label="Division"
            options={municipalities}
            value={selectedMunicipality}
            onChange={setSelectedMunicipality}
          />
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 mt-2">
          <div className="text-green-500 font-bold w-full p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
            <span className="w-1/6">Division</span>
            <span className="w-1/4">Product</span>
            <span className="w-1/5">Production</span>
            <span className=" text-red-500 w-1/5">Demand</span>
            <span className="w-1/6">Status</span>
          </div>
          <div className="text-gray-500 font-normal w-full p-4 flex items-center justify-between border-b-2 border-[#E9E9E9]">
            <span className="w-1/6">2</span>
            <span className="w-1/4">Potato</span>
            <span className="w-1/5">100,000kg</span>
            <span className="w-1/5">90,000kg</span>
            <span className="text-green-500 font-medium w-1/6">10% Excess</span>
          </div>
        </div>
      </LocalLayout>
    </div>
  );
};

export default LocalProduction;
