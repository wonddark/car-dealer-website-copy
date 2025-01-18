import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import React, { MouseEventHandler, useState } from "react";
import { useFilters } from "@/components/common/Filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getFuelCounters, getFuelTypes } from "@/store/features/filters.slice";
import * as Collapsible from "@radix-ui/react-collapsible";
import { resetData } from "@/store/features/vehicles.slice";

export default function FuelType() {
  const { fuelTypes, checked, isOpen, toggle, anyValue, clearFilter } =
    useFuelTypes();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="f-trigger" asChild>
        <div className="f-trigger-inner">
          <strong className="flex-fill">Tipo de combustible</strong>
          {anyValue && (
            <button className="f-reset btn p-0" onClick={clearFilter}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <FilterOptionsCheckContainer>
          {fuelTypes.map((item) => (
            <div key={item.category + uuidv4()} className="form-check">
              <input
                className="form-check-input"
                id={item.category}
                type="checkbox"
                name="FuelTypes"
                value={item.category}
                onChange={handleChange}
                checked={checked(item.category)}
                disabled={item.count === 0}
              />
              <label
                className="form-check-label d-inline-flex justify-content-between w-100"
                htmlFor={item.category}
              >
                <span>{item.spanishTranslation}</span>
                <small>{item.count}</small>
              </label>
            </div>
          ))}
        </FilterOptionsCheckContainer>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

const useFuelTypes = () => {
  const data = useAppSelector(getFuelTypes);
  const counters = useAppSelector(getFuelCounters);
  const r = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const fuelTypes = data.map((item) => ({
    ...item,
    count:
      (counters as { [k: string]: number } | undefined)?.[item.category] ?? 0,
  }));

  const searchParams = useSearchParams();
  const checked = (titleVal: string) => {
    const fuelTypes = searchParams.getAll("FuelTypes") ?? [];
    return fuelTypes.includes(titleVal);
  };
  const anyValue = Boolean((searchParams.getAll("FuelTypes") ?? []).length);

  const clearFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams);
    sp.delete("FuelTypes");
    r.push(`${pathname}?${sp}`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { fuelTypes, checked, clearFilter, anyValue, isOpen, toggle };
};
