"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getVehicleTypes } from "@/store/features/filters.slice";

export default function DismissVehicleTypeFilter() {
  const vehicleTypes = useAppSelector(getVehicleTypes);
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
