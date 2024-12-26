import React, { useState } from "react";
import "../styles/components/SalesOrderForm.css";

const SalesOrderForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [status, setStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerName,
      totalAmount: parseFloat(totalAmount),
      orderDate,
      status,
      items: [
        {
          productId,
          quantity: parseInt(quantity),
          unitPrice: parseFloat(unitPrice),
          totalPrice: quantity * unitPrice,
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:3000/api/sales-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setResponseMessage("Order submitted successfully!");
        clearForm();
      } else {
        setResponseMessage("Error submitting order. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error: " + error.message);
    }
  };

  const clearForm = () => {
    setCustomerName("");
    setTotalAmount("");
    setOrderDate("");
    setProductId("");
    setQuantity("");
    setUnitPrice("");
    setStatus("Pending"); // Reset status to default
  };

  const calculateTotalPrice = () => {
    return (quantity && unitPrice ? quantity * unitPrice : 0).toFixed(2);
  };

  return (
    <div className="form-container">
      <h1>Create Sales Order</h1>
      <form onSubmit={handleSubmit} className="sales-order-form">
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Total Amount:</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Order Date:</label>
          <input
            type="datetime-local"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Unit Price:</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Total Price:</label>
          <input type="text" value={`$${calculateTotalPrice()}`} readOnly />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="status-select"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit Order
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default SalesOrderForm;
