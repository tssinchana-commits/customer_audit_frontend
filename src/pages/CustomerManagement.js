import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CustomerManagement() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([
 
  ]);

  useEffect(() => {
  fetchCustomers();
}, []);

const fetchCustomers = () => {
  api.get("/customer/api/v1/customers")
    .then(res => setCustomers(res.data))
    .catch(err => console.error(err));
};

  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: ""
  });

  // 🔎 Search Logic
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
  );

  // ➕ Add Customer
  const handleAddCustomer = () => {
  if (!newCustomer.name || !newCustomer.phone) {
    alert("Please enter name and phone");
    return;
  }

  api.post("/customer/api/v1/customers", {
    name: newCustomer.name,
    phone: newCustomer.phone,
    status: "Active",
    kyc: "Pending"
  })
  .then(() => {
    fetchCustomers();
    setNewCustomer({ name: "", phone: "" });
  })
  .catch(err => console.error(err));
};

  return (
    <div className="customer-management">

      {/* 🔍 Search + Add Section */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="text"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={newCustomer.phone}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, phone: e.target.value })
          }
        />

        <button className="add-btn" onClick={handleAddCustomer}>
          ➕ Add
        </button>
      </div>

      {/* 📋 Customer Table */}
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>KYC</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (
            <tr
             key={customer.id}
            className="customer-row"
>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.status}</td>
            <td>{customer.kyc}</td>

                <td className="actions">
                    <button
                    onClick={() => navigate(`/customer/${customer.id}`)}
                    className="edit-btn"
                    >
                    ✏ Edit
                    </button>
                </td>
                </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManagement;