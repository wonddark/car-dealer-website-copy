"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useVehicleTypes } from "@/components/filters/VehicleTypes";

export default function DismissVehicleTypeFilter() {
  const { data: vehicleTypes } = useVehicleTypes();
  const findFunction = (val: string) =>
    vehicleTypes.find((token) => token.key === val);
  return (
    <DismissFilter
      filterName="VehicleTypes"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="type"
    />
  );
}
