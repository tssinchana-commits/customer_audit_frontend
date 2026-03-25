import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

function LoanPage() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [amount, setAmount] = useState("");


  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const res = await axios.get("http://localhost:8082/loans");

    const filtered = res.data.filter(
      (loan) => loan.accountNumber === accountNumber
    );
    setLoans(filtered);
  };

  const applyLoan = async () => {
    await axios.post("http://localhost:8082/loans", {
      customerId: "18",
      accountNumber: accountNumber,
      amount: Number(amount)
    });

    fetchLoans();
  };

  const approveLoan = async (id) => {
    await axios.post(`http://localhost:8082/loans/${id}/approve`);
    fetchLoans();
  };

  const rejectLoan = async (id) => {
    await axios.post(`http://localhost:8082/loans/${id}/reject`);
    fetchLoans();
  };

  return (
    <div>
      <h2>Loan Management</h2>

      

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={applyLoan}>Apply Loan</button>

      <table border="1">
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
                <button onClick={() => approveLoan(loan.id)}>
                  Approve
                </button>

                <button onClick={() => rejectLoan(loan.id)}>
                  Reject
                </button>

      
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default LoanPage;