import { useState } from "react";
import styles from "../../styles/page.css";
import SalesOrderForm from "@/components/SalesOrderForm";
import SalesUpdateForm from "@/components/SalesUpdateForm";

const SalesOrdersPage = () => {
  const [loading, setLoading] = useState(false);

  const fetchSalesOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sales-orders");
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching sales orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create sales order");
      }
    } catch (error) {
      console.error("Error creating sales order:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sales Orders</h1>
      <div className={styles.formContainer}>
        <SalesOrderForm onSubmit={handleFormSubmit} />
      </div>

      <SalesUpdateForm />
      <a className="link" href="/">
        Back To Main
      </a>
    </div>
  );
};

export default SalesOrdersPage;
