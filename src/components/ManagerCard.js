import React, { useState } from "react";
import api from "../services/api";

function ManagerCard({ loan }) {

  const [showDetails, setShowDetails] = useState(false);
  const updateStatus = async (newStatus) => {
  try {

    await api.put(
      `http://localhost:8082/loans/${loan.id}/status`,
      {
        status: newStatus
      }
    );

    window.location.reload();

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div
  style={{
    background: "white",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "20px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.8)",
    border: "1px solid #e2e8f0"
  }}
>

      {/* TOP ROW */}
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
  value={loan.accountNumber}
  readOnly
  style={{
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    width: "220px",
    fontSize: "15px",
    background: "#f8fafc"
  }}
/>
          <input
  value={`₹ ${loan.amount}`}
  readOnly
  style={{
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    width: "160px",
    fontSize: "15px",
    background: "#f8fafc"
  }}
/>
        </div>

 {/* TOGGLE */}
        <div>
          <span style={{
            background:
  loan.status === "APPROVED"
    ? "#22c55e"
    : loan.status === "REJECTED"
    ? "#ef4444"
    : loan.status === "DOCUMENT_REQUIRED"
    ? "#f97316"
    : "#3b82f6",

color: "white",
padding: "8px 16px",
borderRadius: "30px",
fontWeight: "600",
fontSize: "14px"
          }}>
            {loan.status}
          </span>
         <button
  onClick={() => setShowDetails(!showDetails)}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    marginLeft: "10px",
    cursor: "pointer"
  }}
>
  {showDetails ? "↑" : "↓"}
</button>
        </div>

      </div>

      {/* DETAILS */}
      {showDetails && (
        <div style={{
          marginTop: "10px",
         border: "1px solid #e2e8f0",
background: "#f8fafc",
padding: "20px",
borderRadius: "16px"
        }}>

          <p>Requested: ₹ {loan.amount}</p>
          <p>Approved: ₹ {loan.amount}</p>

          <p>Documents:</p>
          <ul>
            <li>RC of vehicle</li>
            <li>Property document</li>
            <li>RTC</li>
          </ul>

          <button
  onClick={() => updateStatus("APPROVED")}
  style={{
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    marginRight: "10px",
    cursor: "pointer"
  }}
>
  Approve
</button>
          <button
  onClick={() => updateStatus("REJECTED")}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Reject
</button>

        </div>
      )}

    </div>
  );
}

export default ManagerCard;