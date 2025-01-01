"use client";

import React from "react";
import { useFilters } from "@/components/common/Filters";

export default function VehicleTypeInput({
  value,
}: Readonly<{ value: string }>) {
  const { handleCheckChange: handleChange, vehicleTypeChecked: isChecked } =
    useFilters();
  const checked = isChecked(value);
  return (
    <input
      className="form-check-input"
      id={value}
      type="checkbox"
      name="VehicleTypes"
      value={value}
      onChange={handleChange}
      checked={checked}
    />
  );
}
