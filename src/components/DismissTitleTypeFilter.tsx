"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getTitles } from "@/store/features/filters.slice";

export default function DismissTitleTypeFilter() {
  const titles = useAppSelector(getTitles);
  const findFunction = (val: string) =>
    titles.find((token) => token.key === val);

  return (
    <DismissFilter
      filterName="TitleTypes"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="type"
    />
  );
}
