"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getSaleStatus } from "@/store/features/filters.slice";

export default function DismissSaleStatusFilter() {
  const status = useAppSelector(getSaleStatus);
  const findFunction = (val: string) => status.find((item) => item.key === val);

  return (
    <DismissFilter
      filterName="SaleStatuses"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="label"
    />
  );
}
