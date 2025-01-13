"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { VehicleResponse } from "@/types/vehicle";
import HorizontalVehiclesCarrousel from "@/components/HorizontalVehiclesCarrousel";

export default function BuyNow() {
  const [result, setResult] = useState<{
    response: VehicleResponse;
    error: boolean;
    loading: boolean;
  }>({
    response: {
      data: [],
      pageNumber: 1,
      pageSize: 12,
      totalPages: 0,
      totalCount: 0,
    },
    loading: true,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_DOMAIN +
            "/api/inventory/search?HasBuyNowPrice=true&IsBestOffer=false&PageNumber=1&PageSize=12",
          { signal: controller.signal },
        ).then((res) => res.json());

        setResult({ response: res, loading: false, error: false });
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return null;
        } else {
          console.error(e);
          setResult((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {!result.loading && !result.error && result.response.data.length > 0 && (
        <section className="card p-1">
          <h5 className="ps-1">Comprar ahora</h5>
          <HorizontalVehiclesCarrousel
            data={result.response}
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
