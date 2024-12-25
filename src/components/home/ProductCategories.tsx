import React from "react";
import Link from "next/link";
import vehicleCategories from "@/data/vehicle_categories";

const ProductCategories = () => {
  return (
    <div className="py-3">
      <div className="container-xl">
        <div className="row g-2 align-items-stretch overflow-x-auto flex-nowrap">
          {vehicleCategories.slice(0, 6).map((item) => (
            <div key={item.title} className="col-6 col-md-3 col-xl-2">
              <div className="h-100 card catagory-card">
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
            Ver todas las categorías<i className="ms-1 ti ti-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
