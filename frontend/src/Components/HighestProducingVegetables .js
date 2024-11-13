import React, { useEffect, useState } from "react";
import axios from "axios";

const HighestProducingVegetables = ({ username }) => {
  const [productions, setProductions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProductions = async () => {
      setError(null);

      try {
        const response = await axios.get(`http://localhost:4000/api/production/highest?username=${username}`);
        
        if (response.data && response.data.length > 0) {
          setProductions(response.data);
        } else {
          setError("No records found for the given user.");
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    if (username) {
      fetchTopProductions();
    }
  }, [username]);

  if (error) {
    return (    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold p-4">Top 3 Highest Producing Vegetables</h2>
        <a href="#" className="text-green-500 hover:underline p-4">See All</a>
      </div>
      <p>{error}</p>
    </div>)
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold p-4">Top 3 Highest Producing Vegetables</h2>
        <a href="#" className="text-green-500 hover:underline p-4">See All</a>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2 text-green-500 w-56 p-4">Vegetable</th>
            <th className="pb-2 text-green-500 w-56 p-4">Quantity (kg)</th>
          </tr>
        </thead>
        <tbody>
          {productions.map((item, index) => (
            <tr key={index}>
              <td className="py-1 w-56 p-4">{item.vegetableName}</td>
              <td className="py-1 w-56 p-4">{item.totalQuantity}</td> {/* Use totalQuantity as per backend response */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighestProducingVegetables;
