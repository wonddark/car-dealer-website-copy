"use client";

import Link from "next/link";
import React from "react";
import { addToCart, Product } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));
  };
  return (
    <div className="col-12 col-md-6">
      <div className="card product-card">
        <div className="card-body">
          <button className="wishlist-btn">
            <i className="ti ti-heart"></i>
          </button>
          <Link
            className="product-thumbnail d-block"
            href={`/vehicles/${product.id}`}
          >
            <img
              className="mb-2 rounded-2"
              src={product.img as string}
              alt=""
            />
          </Link>

          <Link className="product-title" href={`/vehicles/${product.id}`}>
            {product.title}
          </Link>

          <p className="sale-price">
            $ {product.new_price}
            <span>$ {product.old_price}</span>
          </p>

          <div className="mt-3">
            <ul className="p-0">
              <li className="list-inline-product me-2">
                <span className="flaticon-road-perspective me-1" />
                {
                  product.mileage
                } <span>mi</span>
              </li>
              <li className="list-inline-product me-2">
                <span className="flaticon-gas-station me-2" />
                {product.fuelType}
              </li>
              <li className="list-inline-product">
                <span className="flaticon-gear me-1" />
                {product.transmission}
              </li>
            </ul>
          </div>

          <div>
            {product.flagPrice && (
              <p className="mb-0 mt-4 d-flex align-products-end">
                <strong className="fs-2 lh-base">${product.flagPrice}</strong>
                <span className="small fw-semibold ms-2 pb-1 text-primary">
                  Venta directa
                </span>
              </p>
            )}
            <p className="m-0">
              <strong>${product.currentBid}</strong> <span>Oferta actual</span>
            </p>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAddToCart(product)}
            style={{ cursor: "pointer" }}
          >
            <i className="ti ti-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
