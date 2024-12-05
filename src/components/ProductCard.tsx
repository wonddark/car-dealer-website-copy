"use client";

import Link from "next/link";
import React from "react";
import { addToCart } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { Vehicle } from "@/types/vehicle";

export default function ProductCard({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  const dispatch = useDispatch();
  const handleAddToCart = (item: Vehicle) => {
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
            href={`/vehicles/${vehicle.vin}`}
          >
            <img
              className="mb-2 rounded-2"
              src={vehicle.images[0]}
              alt={vehicle.titleCode}
            />
          </Link>

          <Link className="product-title" href={`/vehicles/${vehicle.vin}`}>
            {vehicle.titleCode}
          </Link>

          <div className="mt-3">
            <ul className="p-0">
              <li className="list-inline-item me-2">
                <span className="flaticon-road-perspective me-1" />
                {
                  vehicle.odometer
                } <span>mi</span>
              </li>
              <li className="list-inline-item me-2">
                <span className="flaticon-gas-station me-2" />
                {vehicle.fuelType}
              </li>
              <li className="list-inline-item">
                <span className="flaticon-gear me-1" />
                {vehicle.transmission}
              </li>
            </ul>
          </div>

          <div>
            {vehicle.buyNowPrice ? (
              <p className="mb-0 mt-4 d-flex align-items-end">
                <strong className="fs-2 lh-base">${vehicle.buyNowPrice}</strong>
                <span className="small fw-semibold ms-2 pb-1 text-primary">
                  Venta directa
                </span>
              </p>
            ) : null}
            <p className="m-0">
              <strong>${vehicle.currentOffer}</strong>{" "}
              <span>Oferta actual</span>
            </p>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAddToCart(vehicle)}
            style={{ cursor: "pointer" }}
          >
            <i className="ti ti-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
