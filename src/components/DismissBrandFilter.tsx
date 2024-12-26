"use client";

import React from "react";
import { useFilters } from "@/components/common/Filters";
import DismissFilter from "@/components/DismissFilter";

export default function DismissBrandFilter() {
  const { brandsAndModels } = useFilters();
  const findFunction = (val: string) =>
    Object.keys(brandsAndModels.original).find((token) => token === val);
  return <DismissFilter filterName="Makes" searchFunction={findFunction} />;
}
