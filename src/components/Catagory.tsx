import top_product from "@/data/top_product";
import Footer from "@/layouts/Footer";
import React from "react";
import HeaderThree from "@/layouts/HeaderThree";
import ProductCard from "@/components/ProductCard";

const Category = ({ title }: { title: string }) => {
  return (
    <>
      <HeaderThree links="" title={title} />

      <div className="page-content-wrapper">
        <div className="top-products-area pb-3">
          <div className="container">
            <div className="row g-2 rtl-flex-d-row-r">
              {top_product.map((item) => (
                <ProductCard vehicle={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>

      <Footer />
    </>
  );
};

export default Category;
