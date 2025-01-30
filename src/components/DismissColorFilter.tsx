"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getColors } from "@/store/features/filters.slice";

export default function DismissColorFilter() {
  const colors = useAppSelector(getColors);
  const findFunction = (val: string) => colors.find((item) => item.key === val);

  return (
    <DismissFilter
      filterName="Colors"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="label"
    />
  );
}
