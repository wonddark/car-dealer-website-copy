"use client";

import { resetData } from "@/store/features/vehicles.slice";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { v4 as uuidv4 } from "uuid";

type Props = {
  filterName: string;
  searchFunction: (
    value: string,
  ) => string | { [k: string]: string | number } | undefined;
  keyValue?: string;
  keyLabel?: string;
};

export default function DismissFilter(props: Readonly<Props>) {
  const { filterName, searchFunction, keyValue, keyLabel } = props;
  const r = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sp = useSearchParams();
  const appliedFilters = Array.from(
    sp
      .entries()
      .filter((item) => item[0] === filterName)
      .map((item) => searchFunction(item[1])),
  ).filter((item) => item !== undefined);

  return (
    <>
      {appliedFilters.map((item) => {
        const callback = () => {
          const sp_copy = new URLSearchParams(sp);
          sp_copy.delete(
            filterName,
            keyValue
              ? (item as Record<string, string>)[keyValue]
              : (item as string),
          );
          const sp_copy_string = sp_copy.toString();
          dispatch(resetData());
          r.push(pathname + sp_copy_string ? `?${sp_copy_string}` : "");
        };
        const key =
          (keyValue
            ? (item as Record<string, string>)[keyValue]
            : (item as string)) + uuidv4();
        const label = keyLabel
          ? (item as Record<string, string>)[keyLabel]
          : (item as string);
        console.log(key, label);
        return (
          <button
            key={key}
            className="btn btn-outline-secondary d-flex align-items-center gap-2 text-nowrap"
            onClick={callback}
          >
            <span>{label}</span>
            <i className="ti ti-x"></i>
          </button>
        );
      })}
    </>
  );
}
