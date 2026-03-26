import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function LoanPage() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8082/loans");

      const filtered = res.data.filter(
        (loan) => loan.accountNumber === accountNumber
      );

      setLoans(filtered);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const applyLoan = async () => {
    try {
      if (!amount) {
        alert("Enter amount");
        return;
      }

      await axios.post("http://localhost:8082/loans", {
        customerId: "18",
        accountNumber: accountNumber,
        amount: Number(amount),
      });

      setAmount("");
      fetchLoans();
    } catch (error) {
      console.error("Apply loan error:", error);
      alert("Error applying loan");
    }
  };

  const approveLoan = async (id) => {
    try {
      await axios.post(`http://localhost:8082/loans/${id}/approve`);
      fetchLoans();
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  const rejectLoan = async (id) => {
    try {
      await axios.post(`http://localhost:8082/loans/${id}/reject`);
      fetchLoans();
    } catch (error) {
      console.error("Reject error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Loan Management</h2>

      {/* Apply Loan */}
      <input
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={applyLoan} style={{ marginLeft: "10px" }}>
        Apply Loan
      </button>

      <hr />

      {/* Loan Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.accountNumber}</td>
              <td>{loan.amount}</td>
              <td>{loan.status}</td>

              <td>
                {loan.status === "PENDING" && (
                  <>
                    <button onClick={() => approveLoan(loan.id)}>
                      Approve
                    </button>

                    <button
                      onClick={() => rejectLoan(loan.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default LoanPage;