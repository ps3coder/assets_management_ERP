import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) =>
          console.error("Error fetching product details:", error)
        );
    }
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
};

export default ProductDetailPage;
