"use client";

import React from "react";
import Link from "next/link";
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
        <section className="card p-1">
          <h5 className="ps-1">Comprar ahora</h5>
          <HorizontalVehiclesCarrousel
            data={data}
            fullListLink="/vehicles?HasBuyNowPrice=true&IsBestOffer=false"
          />
          <div className="hstack justify-content-end mt-1">
            <Link
              href="/vehicles?HasBuyNowPrice=true&IsBestOffer=false"
              className="btn btn-link"
            >
              <span>Ver listado completo </span>
              <i className="ti ti-chevron-right"></i>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
