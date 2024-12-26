"use client";

import React from "react";
import {
  getIsBestOffer,
  toggleBestOffer,
} from "@/redux/features/vehicles.slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DismissVehicleTypeFilter from "@/components/DismissVehicleTypeFilter";
import DismissTitleTypeFilter from "@/components/DismissTitleTypeFilter";
import DismissBrandFilter from "@/components/DismissBrandFilter";
import DismissModelFilter from "@/components/DismissModelFilter";

export default function FiltersBanner() {
  const r = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const dispatch = useAppDispatch();
  const clearAll = () => {
    dispatch(toggleBestOffer());
    r.push(pathname);
  };
  const isBestOffer = useAppSelector(getIsBestOffer);
  return (
    <div className="hstack gap-2">
      {(sp.toString().length || isBestOffer) && (
        <button
          className="btn btn-outline-secondary"
          onClick={clearAll}
          title="Limpiar filtros"
        >
          <i className="ti ti-filter-off"></i>
        </button>
      )}
      <div className="hstack py-2 overflow-auto gap-2 flex-fill">
        <DismissVehicleTypeFilter />
        <DismissTitleTypeFilter />
        <DismissBrandFilter />
        <DismissModelFilter />
      </div>
    </div>
  );
}