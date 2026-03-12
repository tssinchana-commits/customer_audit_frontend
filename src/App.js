import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CustomerManagement from "./pages/CustomerManagement";
import AddCustomer from "./pages/AddCustomer";
import CustomerDetails from "./pages/CustomerDetails";
import EditCustomer from "./components/EditCustomer";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {

  return (

    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/customers"
        element={
          <ProtectedRoute allowedRoles={["ADMIN","VERIFIER","MANAGER","REPRESENTATIVE"]}>
            <CustomerManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute allowedRoles={["REPRESENTATIVE","ADMIN"]}>
            <AddCustomer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/:id"
        element={
          <ProtectedRoute allowedRoles={["VERIFIER","MANAGER","ADMIN"]}>
            <CustomerDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["REPRESENTATIVE","ADMIN"]}>
            <EditCustomer />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}

export default App;