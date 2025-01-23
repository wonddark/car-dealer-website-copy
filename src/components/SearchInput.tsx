"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export const SearchInput = () => {
  const sp = useSearchParams();
  const query = sp.get("SearchInput") ?? "";

  return (
    <input
      type="search"
      className="form-control border-secondary"
      placeholder="VIN, marca, modelo, año o número de lote separados por comas"
      name="SearchInput"
      defaultValue={query}
    />
  );
};
