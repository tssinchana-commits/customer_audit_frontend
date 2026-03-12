import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { canAddCustomer, canEditCustomer } from "../utils/permissions"; 
import { getUserRole } from "../utils/auth";
import { isTokenExpired, logout } from "../utils/auth";
import Navbar from "../components/Navbar";

function CustomerManagement() {

  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();
  const role = getUserRole();
  const selectedRole = localStorage.getItem("role");

  useEffect(() => {

    if (isTokenExpired()) {
      alert("Session expired. Please login again.");
      logout();
      navigate("/");
      return;
    }

    fetchCustomers();

  }, []);

  const fetchCustomers = () => {
    api
      .get("/customer/api/v1/customers")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
      });
  };

  // ✅ FILTER CUSTOMERS BASED ON ROLE
  const getFilteredCustomers = () => {

    if (role === "VERIFIER") {
      return customers.filter(
        (c) => c.customerStatus === "CREATED"
      );
    }

    if (role === "MANAGER") {
      return customers.filter(
        (c) => c.customerStatus === "VERIFIED"
      );
    }

    if (role === "REPRESENTATIVE") {
      return customers;
    }

    return customers;
  };

  const filteredCustomers = getFilteredCustomers();


  const getStatusBadge = (status) => {

  const style = {
    padding: "4px 10px",
    borderRadius: "12px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold"
  };

  switch (status) {

    case "CREATED":
    case "SUBMITTED":
      return <span style={{...style, background:"#f39c12"}}>{status}</span>;

    case "VERIFIED":
      return <span style={{...style, background:"#3498db"}}>{status}</span>;

    case "ACTIVE":
      return <span style={{...style, background:"#2ecc71"}}>{status}</span>;

    case "REJECTED":
      return <span style={{...style, background:"#e74c3c"}}>{status}</span>;

    default:
      return <span>{status}</span>;
  }

};

  return (

    <div>

      <Navbar />

      <div style={{ width: "90%", margin: "40px auto" }}>

        {/* ⭐ NEW HEADER SECTION */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>

          

        </div>

        <h2>Customer Management</h2>

        {/* ✅ TOP SECTION */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>

          {/* RIGHT SIDE BUTTONS */}
          <div>

            {canAddCustomer(role) && (

              <button
                onClick={() => navigate("/add")}
                style={{
                  background: "#2ecc71",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                + Add New Customer
              </button>

            )}

          </div>

        </div>

        {/* ✅ TABLE */}
        <table
          border="1"
          width="100%"
          cellPadding="10"
          style={{ borderCollapse: "collapse" }}
        >

          <thead style={{ background: "#f0f0f0" }}>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredCustomers.length === 0 ? (

              <tr>
                <td colSpan="5" align="center">
                  No Customers Available For {role}
                </td>
              </tr>

            ) : (

              filteredCustomers.map((customer) => (

                <tr key={customer.id}>

                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{getStatusBadge(customer.customerStatus)}</td>

                  <td>

                    <button
                      onClick={() =>
                        navigate(`/customer/${customer.id}`, {
                          state: { role: role }
                        })
                      }
                    >
                      View
                    </button>

                    {canEditCustomer(role) && (

                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          navigate(`/customer/${customer.id}/edit`, {
                            state: { role: role }
                          })
                        }
                      >
                        Edit
                      </button>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default CustomerManagement;