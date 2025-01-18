"use client";

import React from "react";
import Link from "next/link";
import "swiper/css";
import HorizontalVehiclesCarrousel from "@/components/HorizontalVehiclesCarrousel";
import { useAppSelector } from "@/store/hooks";
import { getMostWanted } from "@/store/features/vehicles.slice";
import { useGetMostWantedQuery } from "@/store/api";

export default function MostWanted() {
  useGetMostWantedQuery({});
  const data = useAppSelector(getMostWanted);

  return (
    <>
      {data && (
        <section className="card p-1">
          <h5 className="ps-1">Más buscados</h5>
          <HorizontalVehiclesCarrousel
            data={data}
            fullListLink="/vehicles?IsBestOffer=true"
          />
          <div className="hstack justify-content-end mt-1">
            <Link href="/vehicles?IsBestOffer=true" className="btn btn-link">
              <span>Ver listado completo </span>
              <i className="ti ti-chevron-right"></i>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
