import React from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div className="App p-0">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
