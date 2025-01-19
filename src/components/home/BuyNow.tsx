"use client";

import React from "react";
import HorizontalVehiclesCarrousel from "@/components/HorizontalVehiclesCarrousel";
import { useAppSelector } from "@/store/hooks";
import { getBuyNow } from "@/store/features/vehicles.slice";
import { useGetBuyNowQuery } from "@/store/api";

export default function BuyNow() {
  useGetBuyNowQuery({});
  const data = useAppSelector(getBuyNow);

  return (
    <>
      {data && (
        <section className="vstack align-items-center gap-3">
          <HorizontalVehiclesCarrousel
            data={data}
            fullListLink="/vehicles?HasBuyNowPrice=true&IsBestOffer=false"
          />
        </section>
      )}
    </>
  );
}
