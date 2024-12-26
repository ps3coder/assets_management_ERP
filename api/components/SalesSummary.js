import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/components/SalesSummary.css";

const SalesSummary = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/reports/sales-summary")
      .then((response) => setSummary(response.data))
      .catch((error) => {
        console.error(error);
        setError("Failed to load sales summary. Please try again later.");
      });
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!summary) {
    return <p className="loading">Loading Sales Summary...</p>;
  }

  return (
    <div className="sales-summary">
      <h1>Sales Summary</h1>
      <table className="sales-table">
        <caption>Sales Summary Report</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((statusGroup) => (
            <tr key={statusGroup.status}>
              <td>{statusGroup.status}</td>
              <td>{statusGroup._sum?.totalAmount || 0}</td>
              <td>{statusGroup._count?.id || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesSummary;
