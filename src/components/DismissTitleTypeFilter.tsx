"use client";

import React from "react";
import { useFilters } from "@/components/common/Filters";
import DismissFilter from "@/components/DismissFilter";

export default function DismissTitleTypeFilter() {
  const { titleTypes } = useFilters();
  const findFunction = (val: string) =>
    titleTypes.data.find((token) => token.key === val);

  return (
    <DismissFilter
      filterName="TitleTypes"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="type"
    />
  );
}
