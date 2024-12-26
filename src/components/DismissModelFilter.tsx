"use client";

import { resetData, toggleLoading } from "@/redux/features/vehicles.slice";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useFilters } from "@/components/common/Filters";
import { v4 as uuidv4 } from "uuid";

export default function DismissModelFilter() {
  const r = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sp = useSearchParams();
  const { brandsAndModels } = useFilters();
  const appliedFilters = sp.entries();
  const appliedModels = Array.from(
    appliedFilters
      .filter((item) => item[0] === "Models")
      .map((item) => brandsAndModels.models.find((token) => token === item[1])),
  ).filter((item) => item !== undefined);

  return (
    <>
      {appliedModels.map((item) => (
        <button
          key={item + uuidv4()}
          className="btn btn-outline-secondary d-flex align-items-center gap-2 text-nowrap"
          onClick={() => {
            const sp_copy = new URLSearchParams(sp);
            sp_copy.delete("Models", item);
            const sp_copy_string = sp_copy.toString();
            dispatch(toggleLoading());
            dispatch(resetData());
            r.push(pathname + sp_copy_string ? `?${sp_copy_string}` : "");
          }}
        >
          <span>{item}</span>
          <i className="ti ti-x"></i>
        </button>
      ))}
    </>
  );
}
