"use client";

import React from "react";
import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getDriveTypes } from "@/store/features/filters.slice";

export default function DismissDriveTypeFilter() {
  const drives = useAppSelector(getDriveTypes);
  const findFunction = (val: string) => drives.find((item) => item.key === val);

  return (
    <DismissFilter
      filterName="DriveTypes"
      searchFunction={findFunction}
      keyValue="key"
      keyLabel="label"
    />
  );
}
