"use client";

import { Vehicle } from "@/types/vehicle";
import { Controller, FreeMode } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";

export default function SwappableImages({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  const [control1, setControl1] = useState<SwiperClass>();
  const [control2, setControl2] = useState<SwiperClass>();
  const hasImages = (vehicle.imageUrls ?? []).length > 0;
  const mainSwiperRef = useRef<SwiperRef>(null);

  return (
    <>
      {hasImages ? (
        <Swiper
          modules={[Controller]}
          className="swiper position-relative"
          slidesPerView="auto"
          onSwiper={setControl1}
          controller={{ control: control2 }}
          zoom={true}
          ref={mainSwiperRef}
          spaceBetween={0}
        >
          <Button
            className="fs-1 position-absolute start-0 z-2 top-0 bottom-0 my-auto p-0 border-0 bg-transparent"
            style={{
              width: "fit-content",
              height: "fit-content",
              lineHeight: "100%",
            }}
            variant="dark"
            onClick={() => mainSwiperRef.current?.swiper?.slidePrev()}
          >
            <i className="ti ti-square-chevron-left-filled"></i>
          </Button>
          <Button
            className="fs-1 position-absolute end-0 z-2 top-0 bottom-0 my-auto p-0 border-0 bg-transparent"
            style={{
              width: "fit-content",
              height: "fit-content",
              lineHeight: "100%",
            }}
            variant="dark"
            onClick={() => mainSwiperRef.current?.swiper?.slideNext()}
          >
            <i className="ti ti-square-chevron-right-filled"></i>
          </Button>
          {vehicle.imageUrls?.map((item) => (
            <SwiperSlide key={item} className="m-0">
              <img
                src={item}
                alt={`${vehicle.year}${vehicle.make}${vehicle.model} subasta cubana comprar carros baratos`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.year}${vehicle.make}${vehicle.model} subasta cubana comprar carros baratos`}
        />
      )}
      {hasImages ? (
        <Swiper
          modules={[FreeMode, Controller]}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.9,
            momentumVelocityRatio: 0.9,
          }}
          className="swiper pt-1"
          slidesPerView="auto"
          onSwiper={setControl2}
          controller={{ control: control1 }}
          spaceBetween={2}
        >
          {vehicle.imageUrls?.map((item) => (
            <SwiperSlide key={item}>
              <img
                src={item}
                style={{
                  height: 64,
                  objectFit: "cover",
                }}
                className="object-fit-cover rounded-2 shadow"
                alt={`${vehicle.year}${vehicle.make}${vehicle.model} subasta cubana comprar carros baratos`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </>
  );
}
