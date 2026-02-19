import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CustomerDetails from "./pages/CustomerDetails";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/customer/:id" element={<CustomerDetails />} />
    </Routes>
  </BrowserRouter>
);