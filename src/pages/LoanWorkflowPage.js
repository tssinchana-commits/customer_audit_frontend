import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import LoanCard from "../components/LoanCard";
import RepresentativeCard from "../components/RepresentativeCard";
import ManagerCard from "../components/ManagerCard";

function LoanWorkflowPage() {

  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
  try {
    const res = await api.get("http://localhost:8082/loans");

    console.log("Loans data:", res.data); // ✅ correct

    setLoans(res.data);
  } catch (err) {
    console.error("Error fetching loans:", err);
  }
};

  // 🔹 Split based on status (IMPORTANT)
const verifierLoans = loans.filter(
  l => l.status === "APPLIED"
);

const representativeLoans = loans.filter(
  l => l.status === "DOCUMENT_REQUIRED"
);

const managerLoans = loans.filter(
  l => l.status === "VERIFIED"
);


  return (
  <div
  style={{
    padding: "40px",
    background: "#f4f7fb",
    minHeight: "100vh"
  }}
>

    <h2
  style={{
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "36px",
    color: "#1e293b"
  }}
>
  Verifier
</h2>

    {verifierLoans.map((loan) => (
      <LoanCard
        key={loan.id}
        loan={loan}
        role="VERIFIER"
        refresh={fetchLoans}
      />
    ))}

    {/* REPRESENTATIVE */}
<h2
  style={{
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "36px",
    color: "#1e293b"
  }}
>
  Representative
</h2>

{representativeLoans.map((loan) => (
  <RepresentativeCard key={loan.id} loan={loan} />
))}


{/* MANAGER */}
<h2
  style={{
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "36px",
    color: "#1e293b"
  }}
>
  Manager
</h2>
{managerLoans.map((loan) => (
  <ManagerCard key={loan.id} loan={loan} />
))}

<button onClick={() => navigate(-1)}>⬅ Back</button>
  </div>
);


}

export default LoanWorkflowPage;