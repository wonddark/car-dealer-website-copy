"use client";

import React from "react";
import "swiper/css";
import HorizontalVehiclesCarrousel from "@/components/HorizontalVehiclesCarrousel";
import { useAppSelector } from "@/store/hooks";
import { getMostWanted } from "@/store/features/vehicles.slice";
import { useGetMostWantedQuery } from "@/store/api";

export default function MostWanted() {
  const { isLoading } = useGetMostWantedQuery({});
  const data = useAppSelector(getMostWanted);

  return (
    <>
      {data && (
        <section className="vstack align-items-center gap-3">
          <HorizontalVehiclesCarrousel
            data={data}
            loading={isLoading}
            fullListLink="/vehicles?IsBestOffer=true"
          />
        </section>
      )}
    </>
  );
}
