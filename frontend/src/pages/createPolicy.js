// CreatePolicy.js
import React from 'react';
// import Sidebar from '../Components/Sidebar';
import Layout from './layout';


const CreatePolicy = () => {
  return (
    <div className="flex flex-col w-full">
      <Layout title="Policies">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Create a New Policy</h2>
        {/* Add form fields for creating a policy */}
        <div className="bg-white p-8 rounded-md shadow">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Policy Title</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                placeholder="Enter policy title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 pb-2">Description</label>
              <textarea
                className="w-full h-36 p-2 border border-gray-300 rounded bg-[#E9E9E9]"
                placeholder="Enter policy description"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Policy
            </button>
          </form>
        </div>
      </div>
      </Layout>
    </div>
  );
};

export default CreatePolicy;
