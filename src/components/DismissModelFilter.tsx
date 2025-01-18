"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getModels } from "@/store/features/filters.slice";

export default function DismissModelFilter() {
  const models = useAppSelector(getModels);
  const findFunction = (val: string) =>
    models.find((token) => token.key === val);

  return <DismissFilter filterName="Models" searchFunction={findFunction} />;
}
