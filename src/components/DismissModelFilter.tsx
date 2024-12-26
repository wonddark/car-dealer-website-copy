"use client";

import React from "react";
import { useFilters } from "@/components/common/Filters";
import DismissFilter from "@/components/DismissFilter";

export default function DismissModelFilter() {
  const { brandsAndModels } = useFilters();
  const findFunction = (val: string) =>
    brandsAndModels.models.find((token) => token === val);

  return <DismissFilter filterName="Models" searchFunction={findFunction} />;
}
