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
import "./index.css";

const App = () => {
  return (
    <div className="App p-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-report" element={<RequestReport />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/read-policy" element={<ReadPolicy />} />
          <Route path="/create-policy" element={<CreatePolicy />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/local-home" element={<LocalHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
