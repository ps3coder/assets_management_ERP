import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components/ProductList.css"; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error("Invalid data format: products should be an array");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list-container">
      <h1 className="title">Products</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <h2 className="product-name">{product.name}</h2>
            <h2 className="product-name">{product.id}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-quantity">Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
