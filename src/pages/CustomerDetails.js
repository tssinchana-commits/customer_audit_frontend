import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [viewMode, setViewMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  // 🔹 TEMP ROLE (change to test)
  const userRole = "VERIFICATION"; 
  // REPRESENTATIVE / VERIFICATION / MANAGER

  // 🔹 Fetch Customer
  const fetchCustomer = async () => {
    try {
      const res = await api.get(`/customer/api/v1/customers/${id}`);
      setCustomer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  // 🔹 STATUS UPDATE FUNCTION
  const updateStatus = async (newStatus) => {
  try {
    await api.put(
      `/customer/api/v1/customers/${id}/status`,
      {
        status: newStatus,
        role: userRole,
        username: "Sinchana",
        remarks: "Updated via UI"
      }
    );

    alert("Status Updated Successfully");
    fetchCustomer();

  } catch (error) {
    console.error(error);
  }
};

  const handleDelete = async () => {
    try {
      await api.delete(`/customer/api/v1/customers/${id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", customer.name || "");
      formData.append("phone", customer.phone || "");
      formData.append("kyc", customer.kyc || "");
      formData.append("aadhaar", customer.aadhaar || "");
      formData.append("pan", customer.pan || "");

      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      await api.put(
        `/customer/api/v1/customers/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Customer Updated");
      fetchCustomer();
      setViewMode(true);
      setSelectedFile(null);

    } catch (err) {
      console.error(err);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>CUSTOMER: {customer.name}</h2>
      </div>

      {/* VIEW MODE */}
      {viewMode && (
        <div style={styles.content}>
          <div style={styles.photoBox}>
            {customer.photo ? (
              <img
                src={`http://localhost:8081/uploads/${customer.photo}`}
                alt="customer"
                style={styles.image}
              />
            ) : (
              <p style={styles.noPhoto}>No Photo</p>
            )}
          </div>

          <div style={styles.details}>
            <Detail label="Name" value={customer.name} />
            <Detail label="Phone" value={customer.phone} />
            <Detail label="Status" value={customer.customerStatus} />
            <Detail label="KYC" value={customer.kyc} />
            <Detail label="Aadhaar" value={customer.aadhaar} />
            <Detail label="PAN" value={customer.pan} />

            {/* 🔹 Audit Info */}
            <hr />
            <h3>Status Info</h3>
            <Detail label="Created By" value={customer.createdBy} />
            <Detail label="Verified By" value={customer.verifiedBy} />
            <Detail label="Approved By" value={customer.approvedBy} />
            <Detail label="Verified At" value={customer.verifiedAt} />
            <Detail label="Approved At" value={customer.approvedAt} />
            <Detail label="Remarks" value={customer.remarks} />


            {/* 🔹 ROLE BASED BUTTONS */}

{customer.customerStatus === "SUBMITTED" && userRole === "VERIFICATION" && (
  <div style={styles.buttonGroup}>
  <button onClick={() => updateStatus("VERIFIED")}>
    Verify
  </button>

  <button onClick={() => updateStatus("REJECTED")}>
    Reject
  </button>
</div>
)}

{customer.customerStatus === "VERIFIED" && userRole === "MANAGER" && (
  <div style={styles.buttonGroup}>
  <button onClick={() => updateStatus("VERIFIED")}>
    Verify
  </button>

  <button onClick={() => updateStatus("REJECTED")}>
    Reject
  </button>
</div>
)}

{customer.customerStatus === "REJECTED" && userRole === "VERIFICATION" && (
  <div style={styles.buttonGroup}>
  <button onClick={() => updateStatus("VERIFIED")}>
    Verify
  </button>
</div>
)}

            {customer.customerStatus === "SUBMITTED" && userRole === "VERIFICATION" && (
              <>
                <button onClick={() => updateStatus("VERIFIED")}>
                  Approve
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => updateStatus("REJECTED")}
                >
                  Reject
                </button>
              </>
            )}

            {customer.customerStatus === "VERIFIED" && userRole === "MANAGER" && (
              <>
                <button onClick={() => updateStatus("ACTIVE")}>
                  Final Approve
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => updateStatus("MANAGER_REJECTED")}
                >
                  Reject
                </button>
              </>
            )}

            {userRole === "REPRESENTATIVE" && customer.status !== "SUBMITTED" && (
              <button onClick={() => updateStatus("SUBMITTED")}>
                Submit
              </button>
            )}
          </div>
        </div>
      )}

     {/* EDIT MODE */}
{!viewMode && (
  <div style={styles.editContainer}>
    <h3>Edit Customer</h3>

    <label>Name</label>
    <input
      type="text"
      value={customer.name || ""}
      onChange={(e) =>
        setCustomer({ ...customer, name: e.target.value })
      }
    />

    <label>Phone</label>
    <input
      type="text"
      value={customer.phone || ""}
      onChange={(e) =>
        setCustomer({ ...customer, phone: e.target.value })
      }
    />

    <label>KYC</label>
    <input
      type="text"
      value={customer.kyc || ""}
      onChange={(e) =>
        setCustomer({ ...customer, kyc: e.target.value })
      }
    />

    <label>Aadhaar</label>
    <input
      type="text"
      value={customer.aadhaar || ""}
      onChange={(e) =>
        setCustomer({ ...customer, aadhaar: e.target.value })
      }
    />

    <label>PAN</label>
    <input
      type="text"
      value={customer.pan || ""}
      onChange={(e) =>
        setCustomer({ ...customer, pan: e.target.value })
      }
    />

    <label>Upload Photo</label>
    <input
      type="file"
      onChange={(e) => setSelectedFile(e.target.files[0])}
    />

    <br /><br />

    <button onClick={handleUpdate}>Save</button>
    <button onClick={() => setViewMode(true)}>Cancel</button>
  </div>
)}

      <div style={styles.footerButtons}>
        <button onClick={() => setViewMode(!viewMode)}>
          {viewMode ? "Edit" : "Back to View"}
        </button>

        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

const Detail = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value || "-"}
  </p>
);

const styles = {
  container: {
    width: "80%",
    margin: "30px auto",
    fontFamily: "Arial"
  },

  header: {
    background: "#028dc5",
    padding: "15px",
    color: "white",
    borderRadius: "5px"
  },

  content: {
    display: "flex",
    gap: "40px",
    padding: "30px",
    background: "#f9f9f9",
    borderRadius: "5px"
  },

  photoBox: {
    width: "200px",
    height: "200px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  noPhoto: {
    textAlign: "center",
    marginTop: "80px",
    color: "gray"
  },

  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  buttonGroup: {
    marginTop: "15px",
    display: "flex",
    gap: "10px"
  },

  editContainer: {
    padding: "30px",
    background: "#f5f5f5",
    borderRadius: "5px"
  },

  footerButtons: {
    textAlign: "center",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "15px"
  }
};

    
export default CustomerDetails;