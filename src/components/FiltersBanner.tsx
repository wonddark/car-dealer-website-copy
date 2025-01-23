"use client";

import React from "react";
import { resetData } from "@/store/features/vehicles.slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import DismissVehicleTypeFilter from "@/components/DismissVehicleTypeFilter";
import DismissTitleTypeFilter from "@/components/DismissTitleTypeFilter";
import DismissBrandFilter from "@/components/DismissBrandFilter";
import DismissModelFilter from "@/components/DismissModelFilter";
import DismissFilter from "@/components/DismissFilter";
import {
  useGetAuctionsQuery,
  useGetDamageTranslationsQuery,
  useGetFuelTypesQuery,
  useGetMakersAndModelsQuery,
  useGetTitleTypesQuery,
  useGetTransmissionTranslationsQuery,
  useGetVehicleTypesQuery,
} from "@/store/api";

export default function FiltersBanner() {
  const { sp, clearAll } = useFiltersBanner();
  return (
    <div className="hstack gap-2 overflow-auto">
      {Boolean(sp.toString().length) && (
        <button
          className="btn btn-outline-secondary"
          onClick={clearAll}
          title="Limpiar filtros"
        >
          <span>Limpiar</span>
          <i className="ti ti-filter-off ms-1"></i>
        </button>
      )}
      <div className="hstack overflow-auto gap-2 flex-fill">
        <DismissVehicleTypeFilter />
        <DismissTitleTypeFilter />
        <DismissBrandFilter />
        <DismissModelFilter />
        <DismissFilter
          filterName="FuelTypes"
          searchFunction={(val) =>
            [
              "Gasoline",
              "Gasoline Hybrid",
              "Gasoline Plug-In Hybrid",
              "Electric",
              "Diesel",
              "Flex",
            ].find((item) => item === val)
          }
        />
      </div>
    </div>
  );
}

const useFiltersBanner = () => {
  useGetVehicleTypesQuery({});
  useGetDamageTranslationsQuery({});
  useGetAuctionsQuery({});
  useGetFuelTypesQuery({});
  useGetTitleTypesQuery({});
  useGetMakersAndModelsQuery({});
  useGetTransmissionTranslationsQuery({});
  const r = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const dispatch = useAppDispatch();
  const clearAll = () => {
    dispatch(resetData());
    r.push(pathname);
  };

  return { sp, clearAll };
};
