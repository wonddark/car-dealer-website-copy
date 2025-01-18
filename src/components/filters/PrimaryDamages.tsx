import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import React, { MouseEventHandler, useState } from "react";
import { useFilters } from "@/components/common/Filters";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getDamagesTranslations,
  getPrimaryDamagesCounters,
} from "@/store/features/filters.slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { resetData } from "@/store/features/vehicles.slice";

const FILTER_NAME = "PrimaryDamages";

export default function PrimaryDamages() {
  const { damages, checked, isOpen, toggle, anyValue, clearFilter } =
    useDamages();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="f-trigger" asChild>
        <div className="f-trigger-inner">
          <strong className="flex-fill">Daños primarios</strong>
          {anyValue && (
            <button className="f-reset btn p-0" onClick={clearFilter}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <FilterOptionsCheckContainer>
          {damages.map((item) => (
            <div key={item.key + uuidv4()} className="form-check">
              <input
                className="form-check-input"
                id={item.key}
                type="checkbox"
                name={FILTER_NAME}
                value={item.key}
                onChange={handleChange}
                checked={checked(item.key)}
                disabled={item.count === 0}
              />
              <label
                className="form-check-label d-flex justify-content-between align-items-end"
                htmlFor={item.key}
              >
                <span>{item.label}</span>
                <small>{item.count}</small>
              </label>
            </div>
          ))}
        </FilterOptionsCheckContainer>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

const useDamages = () => {
  const searchParams = useSearchParams();
  const translations = useAppSelector(getDamagesTranslations);
  const counters = useAppSelector(getPrimaryDamagesCounters);
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const damages = Object.entries(translations).map((item) => ({
    key: item[0],
    label: item[1],
    count: (counters as { [k: string]: number } | undefined)?.[item[0]] ?? 0,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const anyValue = Boolean((searchParams.getAll(FILTER_NAME) ?? []).length);

  const checked = (val: string) => searchParams.get(FILTER_NAME) === val;

  const clearFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams);
    sp.delete(FILTER_NAME);
    push(`${pathname}?${sp}`);
  };

  return { damages, checked, isOpen, anyValue, clearFilter, toggle };
};
