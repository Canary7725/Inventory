import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Policies from "./pages/policies";
import CreatePolicy from "./pages/createPolicy";
import RequestReport from "./pages/requestReport";
import ReadPolicy from "./pages/readPolicy";
import Complaints from "./pages/complaints";
import LocalHome from "./pages/local/home";
import LocalProduction from "./pages/local/production";
import OutgoingRequests from "./pages/local/outgoingRequest";
import CreateRequestForm from "./pages/local/createRequestForm";
import RequestedProducts from "./pages/local/requestedProducts";
import ContributeForm from "./pages/local/contributeForm";
import LocalPolicies from "./pages/local/policies";
import LocalComplaints from "./pages/local/complaints";
import LocalCreateComplaintForm from "./pages/local/complaintForm";
import WardHome from "./pages/ward/home";
import WardProduction from "./pages/ward/production";
import WardPolicies from "./pages/ward/policies";
import WardComplaints from "./pages/ward/complaints";
import WardCreateComplaintForm from "./pages/ward/complaintForm";

import "./index.css";

const App = () => {
  return (
    <div className="App p-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-report" element={<RequestReport />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/read-policy" element={<ReadPolicy />} />
          <Route path="/create-policy" element={<CreatePolicy />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/local-home" element={<LocalHome />} />
          <Route path="/local-production" element={<LocalProduction />} />
          <Route path="/local-outgoing-requests" element={<OutgoingRequests />} />
          <Route path="/local-create-request-form" element={<CreateRequestForm />} />
          <Route path="/local-requested-products" element={<RequestedProducts />} />
          <Route path="/local-contribute-form" element={<ContributeForm />} />
          <Route path="/local-policies" element={<LocalPolicies />} />
          <Route path="/local-complaints" element={<LocalComplaints />} />
          <Route path="/local-create-complaints-form" element={<LocalCreateComplaintForm />} />
          <Route path="/ward-home" element={<WardHome />} />
          <Route path="/ward-production" element={<WardProduction />} />
          <Route path="/ward-policies" element={<WardPolicies />} />
          <Route path="/ward-complaints" element={<WardComplaints />} />
          <Route path="/ward-create-complaints-form" element={<WardCreateComplaintForm />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
