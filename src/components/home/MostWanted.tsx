import VehicleCard from "@/components/VehicleCard";
import React from "react";
import Link from "next/link";
import { VehicleResponse } from "@/types/vehicle";

export default async function MostWanted() {
  const res = await fetch(
    process.env.API_ENDPOINT +
      "/auction-inventories/search?PageNumber=1&PageSize=4&IsBestOffer=true",
  );
  const data = (await res.json()) as VehicleResponse;
  return (
    <section className="pt-2">
      <h5 className="ps-1">Más buscados</h5>
      <div className="row g-2">
        {data.data.map((item) => (
          <div key={item.vin} className="col-12 col-md-6 col-xl-3">
            <VehicleCard vehicle={item} key={item.vin} />
          </div>
        ))}
      </div>
      <div className="hstack justify-content-end mt-1">
        <Link href="/vehicles?IsBestOffer=true" className="btn btn-light">
          <span>Ver listado completo </span>
          <i className="ti ti-chevron-right"></i>
        </Link>
      </div>
    </section>
  );
}
