"use client";

import React from "react";
import {
  getIsBestOffer,
  toggleBestOffer,
} from "@/redux/features/vehicles.slice";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DismissVehicleTypeFilter from "@/components/DismissVehicleTypeFilter";
import DismissTitleTypeFilter from "@/components/DismissTitleTypeFilter";
import DismissBrandFilter from "@/components/DismissBrandFilter";
import DismissModelFilter from "@/components/DismissModelFilter";

export default function FiltersBanner() {
  const r = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const clearAll = () => {
    dispatch(toggleBestOffer());
    r.push(pathname);
  };
  const isBestOffer = useAppSelector(getIsBestOffer);
  return (
    <div className="hstack gap-3">
      <button
        className="btn btn-sm btn-outline-secondary hstack gap-2 my-2"
        onClick={clearAll}
      >
        <span>Limpiar</span>
      </button>
      <div className="hstack py-2 overflow-auto gap-2 flex-fill">
        <DismissVehicleTypeFilter />
        <DismissTitleTypeFilter />
        <DismissBrandFilter />
        <DismissModelFilter />
      </div>
    </div>
  );
}
