"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import Link from "next/link";
import { VehicleResponse } from "@/types/vehicle";

export default function BuyNowCarrusel({
  data,
}: Readonly<{ data: VehicleResponse }>) {
  return (
    <div className="container">
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ height: "220px" }}
      >
        {data.data.map((item) => (
          <SwiperSlide
            key={item.vin}
            style={{
              width: "fit-content !important",
              margin: "0 2px !important",
            }}
          >
            <div
              key={item.vin}
              className="card position-relative"
              style={{ width: "200px", height: "100%" }}
            >
              <Link
                className="product-thumbnail h-100 w-100"
                href={`/vehicles/${item.vin}`}
              >
                <img
                  className="mb-2 rounded-2 object-fit-cover ratio ratio-4x3 w-100 h-100"
                  style={{ aspectRatio: "4/3" }}
                  src={item.imageUrl}
                  alt={`${item.year} ${item.make} ${item.model} subasta carros suv camionetas camiones compra inmediata florida usa`}
                />
              </Link>
              <p
                className="position-absolute px-2 py-3 z-3 text-white m-0 rounded-bottom-2 fw-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #000000aa 60%, #00000070)",
                  bottom: 0,
                  right: 0,
                  left: 0,
                  fontSize: 12,
                }}
              >{`${item.year} ${item.make} ${item.model}`}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
