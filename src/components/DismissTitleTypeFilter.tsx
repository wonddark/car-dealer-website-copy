"use client";

import { resetData, toggleLoading } from "@/redux/features/vehicles.slice";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useFilters } from "@/components/common/Filters";

export default function DismissTitleTypeFilter() {
  const r = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sp = useSearchParams();
  const { titleTypes } = useFilters();
  const appliedFilters = sp.entries();
  const appliedTitleTypes = Array.from(
    appliedFilters
      .filter((item) => item[0] === "TitleTypes")
      .map((item) => titleTypes.data.find((token) => token.key === item[1])),
  ).filter((item) => item !== undefined);
  return (
    <>
      {appliedTitleTypes.map((item) => (
        <button
          key={item.key}
          className="btn btn-sm btn-outline-secondary hstack gap-2 text-nowrap"
          onClick={() => {
            const sp_copy = new URLSearchParams(sp);
            sp_copy.delete("TitleTypes", item.key);
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
