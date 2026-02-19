import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [viewMode, setViewMode] = useState(true); // VIEW or EDIT

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = () => {
    api
      .get(`/customer/api/v1/customers/${id}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    api
      .delete(`/customer/api/v1/customers/${id}`)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  const handleUpdate = () => {
    api
      .put(`/customer/api/v1/customers/${id}`, customer)
      .then(() => {
        alert("Customer Updated");
        setViewMode(true); // back to view mode
      })
      .catch((err) => console.error(err));
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>CUSTOMER: {customer.name}</h2>
      </div>

      {/* VIEW MODE */}
      {viewMode && (
        <div style={styles.content}>
          <div style={styles.photoBox}>
            {customer.photo ? (
              <img
                src={customer.photo}
                alt="customer"
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
              />
            ) : (
              <p style={{ textAlign: "center", marginTop: "40%" }}>PHOTO</p>
            )}
          </div>

          <div style={styles.details}>
            <Detail label="Name" value={customer.name} />
            <Detail label="Phone" value={customer.phone} />
            <Detail label="Status" value={customer.status} />
            <Detail label="KYC" value={customer.kyc} />
            <Detail label="Aadhaar" value={customer.aadhaar} />
            <Detail label="PAN" value={customer.pan} />
            <Detail label="Email" value={customer.email} />
          </div>
        </div>
      )}

      {/* EDIT MODE */}
      {!viewMode && (
        <div style={{ padding: "20px" }}>
          <h3>Edit Customer</h3>

          <input
            type="text"
            placeholder="Name"
            value={customer.name || ""}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            value={customer.phone || ""}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />

          <label>Status</label>
          <select
            value={customer.status || ""}
            onChange={(e) =>
              setCustomer({ ...customer, status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input
            type="text"
            placeholder="KYC"
            value={customer.kyc || ""}
            onChange={(e) =>
              setCustomer({ ...customer, kyc: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Aadhaar"
            value={customer.aadhaar || ""}
            onChange={(e) =>
              setCustomer({ ...customer, aadhaar: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="PAN"
            value={customer.pan || ""}
            onChange={(e) =>
              setCustomer({ ...customer, pan: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Photo URL"
            value={customer.photo || ""}
            onChange={(e) =>
              setCustomer({ ...customer, photo: e.target.value })
            }
          />

          <br />
          <br />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setViewMode(true)}>Cancel</button>
        </div>
      )}

      {/* CONTROLS */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => setViewMode(!viewMode)}>
          {viewMode ? "Edit" : "Back to View"}
        </button>
        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

const Detail = ({ label, value }) => (
  <p>
    <strong>{label}: </strong> {value}
  </p>
);

const styles = {
  container: {
    border: "1px solid #0da6c5",
    borderRadius: "4px",
    width: "80%",
    margin: "20px auto",
    fontFamily: "Arial",
  },
  header: {
    backgroundColor: "#028dc5",
    padding: "15px",
    color: "white",
    textAlign: "center",
  },
  content: {
    display: "flex",
    padding: "30px",
  },
  photoBox: {
    width: "200px",
    height: "200px",
    backgroundColor: "#c6eefd",
    marginRight: "40px",
    borderRadius: "8px",
  },
  details: {
    flex: 1,
  },
};

export default CustomerDetails;
