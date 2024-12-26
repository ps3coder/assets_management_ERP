import { useState } from "react";
import "../styles/components/ProductAddForm.css";

export default function ProductAddForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productId, setProductId] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();
    const productData = { name, description, price, quantity };
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const newProduct = await response.json();
      console.log("Product created:", newProduct);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    const updatedData = { id: productId, name, description, price, quantity };
    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updatedProduct = await response.json();
      console.log("Product updated:", updatedProduct);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
      });
      if (response.ok) console.log("Product deleted successfully");
      else console.error("Failed to delete product");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h3>Add New Product</h3>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-add">
          Add Product
        </button>
      </form>

      <div className="product-update-delete">
        <h3>Update or Delete Product</h3>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <button onClick={handleUpdate} className="btn btn-update">
          Update Product
        </button>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete Product
        </button>
      </div>
    </div>
  );
}
