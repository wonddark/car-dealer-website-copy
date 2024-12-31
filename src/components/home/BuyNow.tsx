import VehicleCard from "@/components/VehicleCard";
import React from "react";
import Link from "next/link";
import { VehicleResponse } from "@/types/vehicle";

export default async function BuyNow() {
  try {
    const res = await fetch(
      process.env.API_ENDPOINT +
        "/auction-inventories/search?HasBuyNowPrice=true&PageNumber=1&PageSize=4",
    );
    const data = (await res.json()) as VehicleResponse;
    return (
      <section className="pt-2">
        <h5 className="ps-1">Comprar ahora</h5>
        <div className="row g-2">
          {data.data.map((item) => (
            <div key={item.vin} className="col-12 col-md-6 col-xl-3">
              <VehicleCard vehicle={item} />
            </div>
          ))}
        </div>
        <div className="hstack justify-content-end mt-1">
          <Link
            href="/vehicles?HasBuyNowPrice=true&IsBestOffer=false"
            className="btn btn-light"
          >
            <span>Ver listado completo </span>
            <i className="ti ti-chevron-right"></i>
          </Link>
        </div>
      </section>
    );
  } catch (e) {
    console.error(
      "THIS IS THE ERROR",
      e,
      "URL",
      process.env.DOMAIN +
        "/api/inventory/search?HasBuyNowPrice=true&PageNumber=1&PageSize=4",
    );
    return <>Error</>;
  }
}
