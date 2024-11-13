import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layout";

const ReadComplaint = () => {
  const { id } = useParams(); // Get complaint ID from URL
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch complaint details from API
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/complaint/${id}`);
        setComplaint(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaint details:", error);
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  // Render loading state
  if (loading) {
    return <Layout title="Complaint Details"><p className="p-4">Loading...</p></Layout>;
  }

  // Render if no complaint found
  if (!complaint) {
    return <Layout title="Complaint Details"><p className="p-4">Complaint not found.</p></Layout>;
  }

  return (
    <Layout title="Complaint Details">
      <div className="p-6">
        <p className="text-xl font-bold mb-4">Complaint Message:</p>
        <div className="p-4 bg-gray-100 rounded-lg">
          {complaint.message}
        </div>

        {complaint.image && (
          <div className="p-4 mt-4">
            <p className="text-lg font-semibold">Attached Image:</p>
            <img
              src={`http://localhost:4000/${complaint.image}`}
              alt="Complaint Attachment"
              className="mt-2 max-w-full h-auto rounded-lg border"
            />
          </div>
        )}

        <div className="p-4 mt-4">
          <p className="text-lg font-semibold">Issued By:</p>
          <p>{complaint.User ? complaint.User.username : "Unknown User"}</p>
        </div>

        <div className="p-4 mt-4">
          <p className="text-lg font-semibold">Date Issued:</p>
          <p>{new Date(complaint.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ReadComplaint;
