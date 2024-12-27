"use client";

import VehicleCard from "@/components/VehicleCard";
import React from "react";
import VehiclesLoading from "@/components/VehiclesLoading";
import { useBuyNow } from "@/hooks/useBuyNow";
import { setBestOffer } from "@/redux/features/vehicles.slice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function BuyNow() {
  const { response } = useBuyNow();
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  return (
    <section className="pt-2">
      <h5 className="ps-1">Comprar ahora</h5>
      <div className="row g-2">
        {response.data.map((item) => (
          <div key={item.vin} className="col-12 col-md-6 col-xl-3">
            <VehicleCard vehicle={item} />
          </div>
        ))}
        <VehiclesLoading loading={response.loading} />
      </div>
      <div className="hstack justify-content-end mt-1">
        <button
          className="btn btn-light"
          onClick={() => {
            dispatch(setBestOffer(false));
            push("/vehicles?HasBuyNowPrice=true");
          }}
        >
          <span>Ver listado completo </span>
          <i className="ti ti-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
