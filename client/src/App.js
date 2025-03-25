import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/Central/home";

import CreatePolicy from "./pages/Central/createPolicy";
import RequestReport from "./pages/Central/requestReport";
import ReadPolicy from "./pages/Central/readPolicy";
import Policies from "./pages/Central/policies";
import Complaints from "./pages/Central/complaints";
import ReadComplaint from "./pages/Central/readComplaints";
import Forecast from "./pages/Central/forecast";

import LHome from "./pages/Local/home";
import LocalProduction from "./pages/Local/production";
import OutgoingRequests from "./pages/Local/outgoingRequest";
import CreateRequestForm from "./pages/Local/createRequestForm";
import RequestedProducts from "./pages/Local/requestedProducts";
import ContributeForm from "./pages/Local/contributeForm";
import LocalPolicies from "./pages/Local/policies";
import LocalComplaints from "./pages/Local/complaints";
import LocalCreateComplaintForm from "./pages/Local/complaintForm";
import LForecast from "./pages/Local/forecast";

import WardHome from "./pages/Ward/home";
import WardProduction from "./pages/Ward/production";
import WardPolicies from "./pages/Ward/policies";
import WardComplaints from "./pages/Ward/complaints";
import WardCreateComplaintForm from "./pages/Ward/complaintForm";
import WardComplaintForm from "./pages/Ward/complaintForm";
import ManageUsers from "./pages/Central/manageUsers";
import CreateUsers from "./pages/Central/createUsers";
import UpdateUserForm from "./pages/Central/updateUsers";

const App = () => {
  return (
    <div className="App p-0">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/request-report" element={<RequestReport />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/read-policy/:id" element={<ReadPolicy />} />
          <Route path="/create-policy" element={<CreatePolicy />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/read-complaint/:id" element={<ReadComplaint />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/create-user-form" element={<CreateUsers />} />
          <Route path="/update-form/:id" element={<UpdateUserForm />} />

          <Route path="/local-home" element={<LHome />} />
          <Route path="/local-production" element={<LocalProduction />} />
          <Route
            path="/local-outgoing-requests"
            element={<OutgoingRequests />}
          />
          <Route
            path="/local-create-request-form"
            element={<CreateRequestForm />}
          />
          <Route
            path="/local-requested-products"
            element={<RequestedProducts />}
          />
          <Route
            path="/local-contribute-form/:requestId"
            element={<ContributeForm />}
          />
          <Route path="/local-complaints" element={<LocalComplaints />} />
          <Route path="/local-policies" element={<LocalPolicies />} />
          <Route
            path="/create-complaint"
            element={<LocalCreateComplaintForm />}
          />
          <Route
            path="/local-create-complaints-form"
            element={<LocalCreateComplaintForm />}
          />
          <Route path="/local-forecast" element={<LForecast />} />

          <Route path="/ward-home" element={<WardHome />} />
          <Route path="/ward-production" element={<WardProduction />} />
          <Route path="/ward-policies" element={<WardPolicies />} />
          <Route path="/ward-complaints" element={<WardComplaints />} />
          <Route
            path="/ward-create-complaints"
            element={<WardCreateComplaintForm />}
          />
          <Route
            path="/ward-create-complaints-form"
            element={<WardCreateComplaintForm />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
