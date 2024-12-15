import vehicleCategories from "@/data/vehicle_categories";
import Link from "next/link";
import React from "react";
import HeaderThree from "@/layouts/HeaderThree";

export default function CategoriesList() {
  return (
    <>
      <HeaderThree links="" title="Categorías" />

      <div className="page-content-wrapper mt-3">
        <div className="container-xl">
          <div className="row g-2 align-items-stretch">
            {vehicleCategories.map((item) => (
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
        </div>
      </div>
    </>
  );
}
