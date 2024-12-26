"use client";

import React from "react";
import { useFilters } from "@/components/common/Filters";
import DismissFilter from "@/components/DismissFilter";

export default function DismissVehicleTypeFilter() {
  const { vehicleTypes } = useFilters();
  const findFunction = (val: string) =>
    vehicleTypes.data.find((token) => token.key === val);
  return (
    <DismissFilter
      filterName="VehicleTypes"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="type"
    />
  );
}
