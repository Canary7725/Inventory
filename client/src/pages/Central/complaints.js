import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import Layout from "../layout";
import ComplaintLink from '../../Components/Central/Complaints';

// Axios for API requests
import axios from 'axios';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    // Fetch complaints data from the API
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/complaint/');
                setComplaints(response.data.data); // Assuming the response structure { data: [array of complaints] }
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };

        fetchComplaints();
    }, []);

    const handleCreateComplaint = () => {
        navigate('/create-complaint'); // Navigate to the CreateComplaint page
    };

    return (
        <div className="flex flex-col w-full">
            <Layout title="Complaints">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Button text="Create Complaint" onClick={handleCreateComplaint} />
                    </div>
                    <div className="border-t border-[#E9E9E9] bg-white">
                        <div className="text-green-500 p-4 pl-8 pr-8 flex items-center justify-between border-b-2 border-[#E9E9E9]">
                            <span className="w-1/3">Complaint Message</span>
                            <span className="w-1/3">Issued By</span>
                            <span className="w-1/3">Date Issued</span>
                        </div>

                        {/* Render the complaints dynamically */}
                        {complaints.length > 0 ? (
                            complaints.map((complaint) => (
                                <ComplaintLink key={complaint.id} complaint={complaint} />
                            ))
                        ) : (
                            <div className="p-4 text-gray-500">No complaints found.</div>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Complaints;
