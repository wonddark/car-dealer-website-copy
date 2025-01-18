"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getMakers } from "@/store/features/filters.slice";

export default function DismissBrandFilter() {
  const makers = useAppSelector(getMakers);
  const findFunction = (val: string) =>
    makers.find((token) => token.key === val);
  return (
    <DismissFilter
      filterName="Makes"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="key"
    />
  );
}
