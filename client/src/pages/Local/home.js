import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Layout from "../Local/layout";
import Dropdown from "../../Components/Dropdown";
import Chart from "../../Components/Chart";
import Overview from "../../Components/Local/Overview";
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
  const username = token.username;

  // Fetch vegetable names and local users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vegetableRes, userRes] = await Promise.all([
          fetch("http://localhost:4000/api/production/vegetables"),
          fetch("http://localhost:4000/api/auth/locals"),
        ]);

        const vegetables = await vegetableRes.json();
        const users = await userRes.json();

        setVegetableOptions(vegetables);
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
        const token = localStorage.getItem("token");
        const decoded = token ? jwtDecode(token) : null;
        const loggedInUserLocalGov = decoded?.username;

        if (!loggedInUserLocalGov) {
          console.error("No logged-in user found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/production/production-data/${selectedVegetable}`
        );
        const monthlyData = response.data;

        console.log("Monthly Production Data:", monthlyData);

        // Filter and transform the data for the logged-in user's localgov
        const transformedData = monthlyData
          .map((monthData) => {
            // Find user data for the logged-in localgov
            const userDataForLocalgov = monthData.users.find(
              (user) => user.localgov === loggedInUserLocalGov
            );

            if (userDataForLocalgov) {
              return {
                month: monthData.month,
                totalQuantity: userDataForLocalgov.quantity,
                totalLocalDemand: userDataForLocalgov.localDemand,
                userId: userDataForLocalgov.userId,
                localgov: userDataForLocalgov.localgov,
              };
            }
            return null;
          })
          .filter(Boolean); // Remove null entries

        console.log("Transformed Production Data:", transformedData);

        const { totalQuantitySum, totalLocalDemandSum } =
          transformedData.reduce(
            (acc, item) => {
              acc.totalQuantitySum += item.totalQuantity;
              acc.totalLocalDemandSum += item.totalLocalDemand;
              return acc;
            },
            { totalQuantitySum: 0, totalLocalDemandSum: 0 } // Initial accumulator values
          );
        setTotalQuantity(totalQuantitySum);
        setTotalDemand(totalLocalDemandSum);

        setProductionData(transformedData);
      } catch (error) {
        console.error("Failed to fetch production data", error);
      }
    };

    fetchProductionData();
  }, [selectedVegetable]);

  // Remove duplicate useEffect for fetching vegetables since it's already done in the first useEffect

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-2 gap-6">
        <Overview
          quantity={totalQuantity}
          demand={totalLocalDemand}
          vegetable={selectedVegetable}
        />
        <HighestProducingVegetables
          username={username}
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
