import ProductAddForm from "@/components/ProductAddForm";
import ProductList from "@/components/ProductList";
import React from "react";
import "../../styles/page.css";

const index = () => {
  return (
    <div>
      <ProductAddForm />
      <ProductList />
      <a className="link" href="/">
        Back To Main
      </a>
    </div>
  );
};

export default index;
