import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/components/SalesSummary.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  // Prepare data for the chart
  const chartData = {
    labels: summary.map((statusGroup) => statusGroup.status),
    datasets: [
      {
        label: "Total Amount",
        data: summary.map((statusGroup) => statusGroup._sum?.totalAmount || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Orders",
        data: summary.map((statusGroup) => statusGroup._count?.id || 0),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Summary Chart",
      },
    },
  };

  return (
    <div className="sales-summary">
      <h1>Sales Summary</h1>
      <Bar data={chartData} options={chartOptions} />
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
