"use client";

import top_product from "@/data/top_product";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, Product } from "@/redux/features/cartSlice";

const TopProducts = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="top-products-area py-3">
      <div className="container">
        <div className="row g-2">
          {top_product.map((item) => (
            <div key={item.id} className="col-12 col-md-6">
              <div className="card product-card">
                <div className="card-body">
                  <a className="wishlist-btn" href={`/products/${item.id}`}>
                    <i className="ti ti-heart"></i>
                  </a>
                  <Link
                    className="product-thumbnail d-block"
                    href={`/single-product/${item.id}`}
                  >
                    <img className="mb-2" src={item.img as string} alt="" />
                  </Link>

                  <Link
                    className="product-title"
                    href={`/single-product/${item.id}`}
                  >
                    {item.title}
                  </Link>

                  <p className="sale-price">
                    $ {item.new_price}
                    <span>$ {item.old_price}</span>
                  </p>

                  <div className="mt-3">
                    <ul className="p-0">
                      <li className="list-inline-item me-2">
                        <span className="flaticon-road-perspective me-1" />
                        {
                          item.mileage
                        } <span>mi</span>
                      </li>
                      <li className="list-inline-item me-2">
                        <span className="flaticon-gas-station me-2" />
                        {item.fuelType}
                      </li>
                      <li className="list-inline-item">
                        <span className="flaticon-gear me-1" />
                        {item.transmission}
                      </li>
                    </ul>
                  </div>

                  <div>
                    {item.flagPrice && (
                      <p className="mb-0 mt-4">
                        <strong className="fs-2">${item.flagPrice}</strong>
                        <span className="fs-6 fw-medium ms-2">
                          !Cómpralo ya!
                        </span>
                      </p>
                    )}
                    <p className="m-0">
                      <strong>${item.currentBid}</strong>{" "}
                      <span>Oferta actual</span>
                    </p>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAddToCart(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="ti ti-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
