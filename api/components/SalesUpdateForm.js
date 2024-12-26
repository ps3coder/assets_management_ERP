import React, { useState, useEffect } from "react";
import "../styles/components/SalesUpdateForm.css";

const SalesUpdateForm = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSalesOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/sales-orders");
        if (!response.ok) {
          throw new Error("Failed to fetch sales orders");
        }
        const data = await response.json();
        setSalesOrders(data);
      } catch (error) {
        setError("Error fetching sales orders: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesOrders();
  }, []);

  const handleDelete = async () => {
    if (!orderId) {
      setError("Please enter a valid Order ID.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/sales-orders`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete sales order");
      }

      setSalesOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      setOrderId("");
      console.log("Sales order deleted successfully");
    } catch (error) {
      setError("Error deleting sales order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!orderId) {
      setError("Please enter a valid Order ID.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/sales-orders`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, ...updateData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update sales order");
      }

      const updatedOrder = await response.json();
      setSalesOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      setOrderId("");
      setUpdateData({});
      console.log("Sales order updated successfully");
    } catch (error) {
      setError("Error updating sales order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Delete or Update Sales Order</h2>
      <div className="form-section">
        <label>Order ID:</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
      </div>
      <div className="form-section">
        <h3>Update Sales Order</h3>
        <label>Customer Name:</label>
        <input
          type="text"
          value={updateData.customerName || ""}
          onChange={(e) =>
            setUpdateData((prev) => ({
              ...prev,
              customerName: e.target.value,
            }))
          }
          placeholder="Enter Customer Name"
        />
        <label>Status:</label>
        <input
          type="text"
          value={updateData.status || ""}
          onChange={(e) =>
            setUpdateData((prev) => ({ ...prev, status: e.target.value }))
          }
          placeholder="Enter Status"
        />
        <label>Total Amount:</label>
        <input
          type="number"
          value={updateData.totalAmount || ""}
          onChange={(e) =>
            setUpdateData((prev) => ({
              ...prev,
              totalAmount: parseFloat(e.target.value),
            }))
          }
          placeholder="Enter Total Amount"
        />
        <button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Sales Order"}
        </button>
      </div>
      <button onClick={handleDelete} disabled={loading} className="delete-btn">
        {loading ? "Deleting..." : "Delete Sales Order"}
      </button>
      {error && <p className="error-message">{error}</p>}
      <div>
        <h3>Sales Orders</h3>
        {salesOrders.length > 0 ? (
          <ul className="order-list">
            {salesOrders.map((order) => (
              <li key={order.id} className="order-item">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Customer Name:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Order Date:</strong> {order.orderDate}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${order.totalAmount}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sales orders found.</p>
        )}
      </div>
    </div>
  );
};

export default SalesUpdateForm;
