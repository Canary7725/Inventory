import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const OutgoingRequestDrop = ({ requestId, onClose }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/supplier/${requestId}`
      );
      setSuppliers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
      toast.error("Failed to fetch suppliers");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/supplier/${id}/status`, {
        status: newStatus,
      });
      toast.success(`Supplier status updated to ${newStatus}`); // Show success message
      fetchSuppliers(); // Refresh the suppliers list
    } catch (error) {
      console.error("Failed to update supplier status", error);
      toast.error("Failed to update supplier status"); // Show error message
    }
  };

  return (
    <div className="bg-gray-100 text-gray-500 p-4 w-full pl-12">
      <ToastContainer /> {/* Add ToastContainer for displaying toasts */}
      <div className="text-gray-500 p-4 pl-1 w-full">
        <h3 className="text-gray-500 text-lg mb-2 font-bold">Suppliers</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="w-full border-b border-gray-200 bg-gray-200 text-green-500">
              <th className="p-2">Municipality/ VDC</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td className="p-2">{supplier.municipality}</td>
                <td className="p-2">{supplier.quantity}</td>
                <td className="p-2">
                  {new Date(supplier.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">{supplier.status}</td>
                <td className="p-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleStatusChange(supplier.id, "Completed")}
                    disabled={supplier.status !== "Ongoing"}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusChange(supplier.id, "Rejected")}
                    disabled={supplier.status !== "Ongoing"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutgoingRequestDrop;
