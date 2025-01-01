"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useTitleTypes } from "@/components/filters/TitleTypes";

export default function DismissTitleTypeFilter() {
  const { titleTypes } = useTitleTypes();
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
