"use client";

import { resetData, toggleLoading } from "@/redux/features/vehicles.slice";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useFilters } from "@/components/common/Filters";

export default function DismissModelFilter() {
  const r = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sp = useSearchParams();
  const { models } = useFilters();
  const appliedFilters = sp.entries();
  const appliedModels = Array.from(
    appliedFilters
      .filter((item) => item[0] === "Models")
      .map((item) => models.find((token) => token.value === item[1])),
  ).filter((item) => item !== undefined);
  return (
    <>
      {appliedModels.map((item) => (
        <button
          key={item.value}
          className="btn btn-sm btn-outline-secondary hstack gap-2 text-nowrap"
          onClick={() => {
            const sp_copy = new URLSearchParams(sp);
            sp_copy.delete("TitleTypes", item.value);
            const sp_copy_string = sp_copy.toString();
            dispatch(toggleLoading());
            dispatch(resetData());
            r.push(pathname + sp_copy_string ? `?${sp_copy_string}` : "");
          }}
        >
          <span>{item.label}</span>
          <i className="ti ti-x"></i>
        </button>
      ))}
    </>
  );
}
