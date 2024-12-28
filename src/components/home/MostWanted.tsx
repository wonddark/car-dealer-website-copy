"use client";

import VehicleCard from "@/components/VehicleCard";
import React from "react";
import VehiclesLoading from "@/components/VehiclesLoading";
import Link from "next/link";
import { useMostWanted } from "@/hooks/useMostWanted";

export default function MostWanted() {
  const { response } = useMostWanted();
  return (
    <section className="pt-2">
      <h5 className="ps-1">Más buscados</h5>
      <div className="row g-2">
        {response.data.map((item) => (
          <div key={item.vin} className="col-12 col-md-6 col-xl-3">
            <VehicleCard vehicle={item} key={item.vin} />
          </div>
        ))}
        <VehiclesLoading loading={response.loading} />
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
