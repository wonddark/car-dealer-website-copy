import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import React from "react";
import Link from "next/link";
import { Vehicle } from "@/types/vehicle";
import dayjs from "dayjs";
import { renderBuyNowPrice, renderSuggestedBid } from "@/utils/vehicle-data";
import "swiper/css";
import { Button } from "react-bootstrap";
import VehiclesLoading from "@/components/VehiclesLoading";

type Props = { data: Vehicle[]; fullListLink: string; loading: boolean };
export default function HorizontalVehiclesCarrousel(props: Readonly<Props>) {
  const { data, fullListLink, loading } = props;
  return (
    <>
      {!loading ? (
        <Swiper
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 1.7,
            momentumVelocityRatio: 1.7,
          }}
          className="swiper"
          slidesPerView="auto"
          spaceBetween={8}
        >
          {data.map((item) => (
            <SwiperSlide key={item.vin}>
              <div className="slide-card">
                <Link href={`/vehicles/${item.vin}`}>
                  <img
                    className="mb-2 rounded-2 object-fit-cover ratio ratio-4x3 w-100 h-100"
                    style={{ aspectRatio: "4/3" }}
                    src={item.imageUrl}
                    alt={`${item.year} ${item.make} ${item.model} subasta carros suv camionetas camiones compra inmediata florida usa`}
                  />
                </Link>
                <div className="vstack gap-2 px-2 flex-fill">
                  <Link href={`/vehicles/${item.vin}`}>
                    {`${item.year} ${item.make} ${item.model}`}
                  </Link>
                  <div className="vstack text-muted">
                    <small className="m-0">
                      Location: {item.auctionLocation}
                    </small>
                    <small className="m-0">
                      Fecha de venta:{" "}
                      <time
                        dateTime={dayjs(item.saleAuctionDate).format(
                          "YYYY-MM-DD HH:mm",
                        )}
                      >
                        {dayjs(item.saleAuctionDate).format("DD/MM/YYYY HH:mm")}
                      </time>
                    </small>
                  </div>
                </div>
                <div className="vstack gap-1 align-items-stretch mt-3 flex-grow-0">
                  <Link
                    href={`/vehicles/${item.vin}`}
                    className="btn btn-primary"
                  >
                    <span>Ofertar</span>
                    <span className="ps-2">{renderSuggestedBid(item)}</span>
                  </Link>
                  {item.buyNowPrice ? (
                    <Link
                      href={`/vehicles/${item.vin}`}
                      className="btn btn-success"
                    >
                      <span>Comprar ahora</span>
                      <span className="ms-2">{renderBuyNowPrice(item)}</span>
                    </Link>
                  ) : (
                    <Button variant="success" disabled>
                      Sin compra inmediata
                    </Button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div
              className="card flex align-items-center justify-content-center"
              style={{ width: "200px", height: "100%" }}
            >
              <Link href={fullListLink} className="btn btn-link">
                <span>Ver más </span>
                <i className="ti ti-chevron-right"></i>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className="overflow-hidden w-100">
          <div className="row flex-nowrap" style={{ height: 360 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div style={{ width: 300 }} key={item}>
                <VehiclesLoading />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
