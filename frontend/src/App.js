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
          <Route path="/read-complaint/:id" element={<ReadComplaint />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
