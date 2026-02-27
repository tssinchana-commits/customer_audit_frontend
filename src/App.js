import { Routes, Route } from "react-router-dom";
import CustomerManagement from "./pages/CustomerManagement";
import CustomerDetails from "./pages/CustomerDetails";
import CustomerList from "./components/CustomerList";
import "./App.css";

const userRole = "Verification"; // Change to Representation/ Management to test 

function App() {
  return (
    <div className="app-container">

      {/* Common Header Wrapper */}
      <div className="top-bar">
        <div className="header-title">
          Life Saver Microfinance
        </div>
      </div>

      {/* Page Content */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<CustomerManagement />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
        </Routes>
      </div>

    

    </div>
  );
}

export default App;