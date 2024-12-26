"use client";

import { resetData, toggleLoading } from "@/redux/features/vehicles.slice";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useFilters } from "@/components/common/Filters";

export default function DismissVehicleTypeFilter() {
  const r = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sp = useSearchParams();
  const { vehicleTypes } = useFilters();
  const appliedFilters = sp.entries();
  const appliedVehicleTypes = Array.from(
    appliedFilters
      .filter((item) => item[0] === "VehicleTypes")
      .map((item) => vehicleTypes.data.find((token) => token.key === item[1])),
  ).filter((item) => item !== undefined);
  return (
    <>
      {appliedVehicleTypes.map((item) => (
        <button
          key={item.key}
          className="btn btn-outline-secondary d-flex align-items-center gap-2 text-nowrap"
          onClick={() => {
            const sp_copy = new URLSearchParams(sp);
            sp_copy.delete("VehicleTypes", item.key);
            const sp_copy_string = sp_copy.toString();
            dispatch(toggleLoading());
            dispatch(resetData());
            r.push(pathname + sp_copy_string ? `?${sp_copy_string}` : "");
          }}
        >
          <span>{item.type}</span>
          <i className="ti ti-x"></i>
        </button>
      ))}
    </>
  );
}
