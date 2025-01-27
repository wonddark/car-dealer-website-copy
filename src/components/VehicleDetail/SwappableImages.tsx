"use client";

import { Vehicle } from "@/types/vehicle";
import { Controller, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { useState } from "react";

export default function SwappableImages({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  const [control1, setControl1] = useState<SwiperClass>();
  const [control2, setControl2] = useState<SwiperClass>();
  const hasImages = (vehicle.imageUrls ?? []).length > 0;

  return (
    <div className="card-body">
      <div className="row">
        {hasImages ? (
          <Swiper
            modules={[Pagination, Controller]}
            className="swiper col-12"
            slidesPerView="auto"
            onSwiper={setControl1}
            controller={{ control: control2 }}
            zoom={true}
          >
            {vehicle.imageUrls?.map((item) => (
              <SwiperSlide key={item}>
                <img
                  src={item}
                  className="object-fit-cover"
                  alt={`${vehicle.year}${vehicle.make}${vehicle.model} subasta cubana comprar carros baratos`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={vehicle.imageUrl}
            className="object-fit-cover"
            alt={`${vehicle.year}${vehicle.make}${vehicle.model} subasta cubana comprar carros baratos`}
          />
        )}
        {hasImages ? (
          <div className="col-12 py-1">
            <Swiper
              modules={[FreeMode, Pagination, Controller]}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.9,
                momentumVelocityRatio: 0.9,
              }}
              className="swiper"
              slidesPerView="auto"
              onSwiper={setControl2}
              controller={{ control: control1 }}
            >
              {vehicle.imageUrls?.map((item) => (
                <SwiperSlide key={item}>
                  <img
                    src={item}
                    style={{
                      height: 64,
                      objectFit: "cover",
                    }}
                    alt={`${vehicle.year}${vehicle.make}${vehicle.model} subasta cubana comprar carros baratos`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : null}
      </div>
    </div>
  );
}
