"use client";

import React from "react";
import { resetData } from "@/store/features/vehicles.slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import DismissVehicleTypeFilter from "@/components/DismissVehicleTypeFilter";
import DismissTitleTypeFilter from "@/components/DismissTitleTypeFilter";
import DismissBrandFilter from "@/components/DismissBrandFilter";
import DismissModelFilter from "@/components/DismissModelFilter";
import {
  useGetAuctionsQuery,
  useGetDamageTranslationsQuery,
  useGetDriveTypesTranslationsQuery,
  useGetFuelTypesQuery,
  useGetMakersAndModelsQuery,
  useGetTitleTypesQuery,
  useGetTransmissionTranslationsQuery,
  useGetVehicleTypesQuery,
} from "@/store/api";
import DismissFuelTypeFilter from "@/components/DismissFuelTypeFilter";
import DismissOdometerFilter from "@/components/DismissOdometerFilter";
import DismissYearOfReleaseFilter from "@/components/DismissYearOfReleaseFilter";
import DismissDamagesFilter from "@/components/DismissDamagesFilter";
import DismissDealersNameFilter from "@/components/DismissDealersNameFilter";
import DismissTransmissionTypeFilter from "@/components/DismissTransmissionTypeFilter";
import DismissCylindersCountFilter from "@/components/DismissCylindersCountFilter";
import DismissDriveTypeFilter from "@/components/DismissDriveTypeFilter";
import { Button } from "react-bootstrap";

export default function FiltersBanner() {
  const { sp, clearAll } = useFiltersBanner();
  return (
    <div className="hstack gap-2 overflow-auto">
      {Boolean(sp.toString().length) && (
        <Button
          variant="outline-secondary"
          onClick={clearAll}
          title="Limpiar filtros"
        >
          <span>Limpiar</span>
          <i className="ti ti-filter-off ms-1"></i>
        </Button>
      )}
      <div className="hstack overflow-auto gap-2 flex-fill">
        <DismissVehicleTypeFilter />
        <DismissTitleTypeFilter />
        <DismissBrandFilter />
        <DismissModelFilter />
        <DismissFuelTypeFilter />
        <DismissOdometerFilter />
        <DismissYearOfReleaseFilter />
        <DismissDamagesFilter />
        <DismissDealersNameFilter />
        <DismissTransmissionTypeFilter />
        <DismissCylindersCountFilter />
        <DismissDriveTypeFilter />
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
  useGetDriveTypesTranslationsQuery({});
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
