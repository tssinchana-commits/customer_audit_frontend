import React, { useState } from "react";
import api from "../services/api";

function LoanCard({ loan, refresh }) {

  const [showDocs, setShowDocs] = useState(false);

  // UPDATE STATUS
 const updateStatus = async (newStatus) => {

  try {

    console.log("Sending status:", newStatus);

    const response = await api.put(
      `http://localhost:8082/loans/${loan.id}/status`,
      {
        status: newStatus
      }
    );

    console.log("SUCCESS:", response.data);

    alert("Status Updated");

    refresh();

  } catch (err) {

    console.log("FULL ERROR:", err);

    if (err.response) {
      console.log("Backend Error:", err.response.data);
      console.log("Status Code:", err.response.status);
    }

    alert("Update Failed");
  }
};

  return (

    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "18px",
        marginBottom: "20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0"
      }}
    >

      {/* TOP ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        {/* LEFT */}
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

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center"
          }}
        >

          {/* STATUS */}
          <span
            style={{
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
            }}
          >
            {loan.status}
          </span>

          {/* TOGGLE */}
          <button
            onClick={() => setShowDocs(!showDocs)}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {showDocs ? "↑" : "↓"}
          </button>

        </div>

      </div>

      {/* EXPAND SECTION */}
      {showDocs && (

        <div
          style={{
            marginTop: "20px",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "16px"
          }}
        >

          <h3>Loan Details</h3>

          <p>
            <b>Requested Amount:</b> ₹ {loan.amount}
          </p>

          <p>
            <b>Approved Amount:</b> ₹ {loan.amount}
          </p>

          <p>
            <b>Documents:</b>
          </p>

          <ul>
            <li>RC of Vehicle</li>
            <li>Property Document</li>
            <li>RTC</li>
          </ul>

          {/* ACTIONS */}
          <div style={{ marginTop: "20px" }}>

            {/* REQUEST DOCUMENTS */}
            <button
              onClick={() => updateStatus("DOCUMENT_REQUIRED")}
              style={{
                background: "#f97316",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                marginRight: "10px",
                cursor: "pointer"
              }}
            >
              Request Documents
            </button>

            {/* VERIFY */}
            <button
              onClick={() => updateStatus("VERIFIED")}
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
              Verify
            </button>

            {/* REJECT */}
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

        </div>

      )}

    </div>
  );
}

export default LoanCard;