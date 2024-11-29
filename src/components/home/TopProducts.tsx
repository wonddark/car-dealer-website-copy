"use client";

import top_product from "@/data/top_product";
import React from "react";
import ProductCard from "@/components/ProductCard";

const TopProducts = () => {
  return (
    <div className="top-products-area py-3">
      <div className="container">
        <div className="row g-2">
          {top_product.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
