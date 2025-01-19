"use client";
import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import React, { MouseEventHandler, useState } from "react";
import VehicleTypeInput from "@/components/filters/VehicleTypeInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getVehicleTypes,
  getVehicleTypesCounters,
} from "@/store/features/filters.slice";
import * as Collapsible from "@radix-ui/react-collapsible";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resetData } from "@/store/features/vehicles.slice";

export default function VehicleTypes() {
  const { data, isOpen, toggle, anyValue, clearFilters } = useVehicleTypes();

  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="btn f-trigger" asChild>
        <div className="f-trigger-inner">
          <span className="flex-fill">Tipo de vehículo</span>
          {anyValue && (
            <button className="f-reset btn p-0" onClick={clearFilters}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <FilterOptionsCheckContainer>
          {data.map((item) => (
            <div key={item.key} className="form-check">
              <VehicleTypeInput value={item.key} />
              <label
                className="form-check-label d-inline-flex justify-content-between align-items-center w-100"
                htmlFor={item.key}
              >
                <span>{item.type}</span>
                <small>{item.count}</small>
              </label>
            </div>
          ))}
        </FilterOptionsCheckContainer>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export const useVehicleTypes = () => {
  const vehicleTypes = useAppSelector(getVehicleTypes);
  const vehicleTypesCounters = useAppSelector(getVehicleTypesCounters);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const data = vehicleTypes.map((item) => ({
    ...item,
    count:
      (vehicleTypesCounters as { [k: string]: number } | undefined)?.[
        item.key
      ] ?? 0,
  }));

  const sp = useSearchParams();
  const anyValue = Boolean(sp.get("VehicleTypes"));

  const { push } = useRouter();
  const pathname = usePathname();
  const clearFilters: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(resetData());
    const query = new URLSearchParams(sp);
    query.delete("VehicleTypes");
    push(`${pathname}?${query}`);
  };

  return { data, isOpen, toggle, anyValue, clearFilters };
};
