import React from "react";
import Link from "next/link";
import product_categories from "@/data/product_categories";

const ProductCategories = () => {
  return (
    <div className="product-catagories-wrapper py-3">
      <div className="container">
        <div className="row g-2 rtl-flex-d-row-r align-items-stretch">
          {product_categories.slice(0, 4).map((item, i) => (
            <div key={i} className="col-3">
              <div
                className={`h-100 card catagory-card ${i === 7 ? "active" : ""}`}
              >
                <div className="card-body px-2">
                  <Link href={item.url}>
                    <img src={item.img} alt="" />
                    <span>{item.title}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="section-heading d-flex align-items-center justify-content-end dir-rtl mt-2">
          <Link className="btn btn-sm btn-light" href="/categories">
            View all<i className="ms-1 ti ti-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
