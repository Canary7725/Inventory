import React from "react";

const HighestProducingVegetables = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold p-4">Highest Producing Vegetables</h2>
        <a href="#" className="text-green-500 hover:underline p-4">See All</a>
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
            <td className="py-1 p-4">1%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HighestProducingVegetables;
