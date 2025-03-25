import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Fix: Removed curly braces for correct import
import Layout from "../Ward/layout";
import Dropdown from "../../Components/Dropdown";
import Chart from "../../Components/Chart";
import Overview from "../../Components/Ward/Overview";
import HighestProducingVegetables from "../../Components/HighestProducingVegetables ";

import axios from "axios";

const Home = () => {
  const [vegetableOptions, setVegetableOptions] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [selectedVegetable, setSelectedVegetable] = useState("All");
  const [selectedUser, setSelectedUser] = useState("");
  const [productionData, setProductionData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalLocalDemand, setTotalDemand] = useState("");

  const token = jwtDecode(localStorage.token);
  const user_id = token.user_id;

  // Fetch vegetable names and local users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vegetableRes, userRes] = await Promise.all([
          fetch("http://localhost:4000/api/production/vegetables"),
          fetch("http://localhost:4000/api/auth/locals"),
        ]);

        const vegetables = await vegetableRes.json(); // This will be an array of strings
        const users = await userRes.json();

        // Directly set the fetched vegetable names
        setVegetableOptions(vegetables); // No need for `.map` here
        setLocalUsers(users);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductionData = async () => {
      if (selectedVegetable === "All") return;

      try {
        const allProducts = await axios.get(
          `http://localhost:4000/api/production/production-data/${selectedVegetable}`
        );
        const products = allProducts.data;
        console.log("Original data:", products[0]);

        // Filter and transform the data to only include the current user's data
        const filtered = products
          .map((monthData) => {
            // Find the user entry that matches the logged-in user's ID
            const userEntry = monthData.users.find(
              (user) => user.userId === user_id
            );

            if (userEntry) {
              return {
                month: monthData.month,
                totalQuantity: userEntry.quantity,
                totalLocalDemand: userEntry.localDemand,
                userId: userEntry.userId,
                localgov: userEntry.localgov,
              };
            }
            return null;
          })
          .filter(Boolean); // Remove any null entries

        console.log("Filtered data:", filtered);

        const { totalQuantitySum, totalLocalDemandSum } = filtered.reduce(
          (acc, item) => {
            acc.totalQuantitySum += item.totalQuantity;
            acc.totalLocalDemandSum += item.totalLocalDemand;
            return acc;
          },
          { totalQuantitySum: 0, totalLocalDemandSum: 0 } // Initial accumulator values
        );
        setTotalQuantity(totalQuantitySum);
        setTotalDemand(totalLocalDemandSum);

        setProductionData(filtered);
      } catch (error) {
        console.error("Failed to fetch production data", error);
      }
    };

    fetchProductionData();
  }, [selectedVegetable]);

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/production/vegetables"
        );
        const vegetables = await res.json();
        setVegetableOptions(vegetables);
      } catch (error) {
        console.error("Failed to fetch vegetable names", error);
      }
    };
    fetchVegetables();
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="flex space-x-4 my-4">
        <Dropdown
          label="Local User"
          options={localUsers.map((user) => user.username)}
          value={selectedUser}
          onChange={setSelectedUser}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Overview
          quantity={totalQuantity}
          demand={totalLocalDemand}
          vegetable={selectedVegetable}
        />{" "}
        <HighestProducingVegetables
          username={selectedUser}
          selectedVegetable={selectedVegetable}
        />
      </div>
      <div className="flex space-x-4 my-4">
        <Dropdown
          label="Vegetable"
          options={vegetableOptions}
          value={selectedVegetable}
          onChange={setSelectedVegetable}
        />
      </div>
      <div className="mt-6">
        <Chart productionData={productionData} />
      </div>
    </Layout>
  );
};

export default Home;
