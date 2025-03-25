import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import axios from "axios";

const ReadPolicy = () => {
    const { id } = useParams();
    const [policy, setPolicy] = useState(null);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/policy/${id}`);
                setPolicy(response.data.data);
            } catch (error) {
                console.error('Error fetching policy:', error);
            }
        };
        fetchPolicy();
    }, [id]);

    if (!policy) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Layout title={policy.title}>
                <p className="p-4">{policy.description}</p>
            </Layout>
        </div>
    );
};

export default ReadPolicy;
