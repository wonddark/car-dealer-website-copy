"use client";

import VehicleCard from "@/components/VehicleCard";
import React, { useEffect, useState } from "react";
import VehiclesLoading from "@/components/VehiclesLoading";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";

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

const useMostWanted = () => {
  const [response, setResponse] = useState<{
    data: Vehicle[];
    loading: boolean;
    error: boolean;
  }>({ data: [], loading: true, error: false });
  const getData = () => {
    const controller = new AbortController();
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
        "/api/inventory/search?PageNumber=1&PageSize=24&IsBestOffer=true",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((res) => {
        setResponse({ data: res.data, loading: false, error: false });
      })
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return null;
        } else {
          setResponse({ data: [], error: true, loading: false });
        }
      });

    return () => {
      controller.abort();
    };
  };

  useEffect(getData, []);
  return { response };
};
