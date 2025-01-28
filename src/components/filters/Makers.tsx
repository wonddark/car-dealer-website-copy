import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  filterMakers,
  filterModels,
  getMakers,
} from "@/store/features/filters.slice";
import { useFilters } from "@/components/common/Filters";
import { resetData } from "@/store/features/vehicles.slice";

const FILTER_NAME = "Makes";

export default function Makers() {
  const {
    isOpen,
    toggle,
    anyVal,
    clearFilter,
    applyFilter,
    makers,
    handleChange,
    checked,
  } = useMakers();
  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="btn f-trigger" asChild>
        <div className="f-trigger-inner">
          <span className="flex-fill">Marca</span>
          {anyVal && (
            <button className="f-reset btn p-0" onClick={clearFilter}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <div className="position-relative">
          <input
            className="form-control border-secondary position-sticky top-0"
            type="search"
            onChange={applyFilter}
            placeholder="Buscar marca..."
          />
          <FilterOptionsCheckContainer>
            {makers.map((item) => (
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
                  className="form-check-label d-inline-flex justify-content-between w-100"
                  htmlFor={item.key}
                >
                  <span>{item.key}</span>
                  <small>{item.count}</small>
                </label>
              </div>
            ))}
          </FilterOptionsCheckContainer>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

const useMakers = () => {
  const makers = useAppSelector(getMakers);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const { handleCheckChange } = useFilters();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const anyVal = Boolean((searchParams.getAll(FILTER_NAME) ?? []).length);

  const clearFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams);
    sp.delete(FILTER_NAME);

    push(`${pathname}?${sp}`);
  };

  const checked = (val: string) => {
    const values = searchParams.getAll(FILTER_NAME) ?? [];

    return values.length > 0 ? values.some((item) => item === val) : false;
  };

  const applyFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(filterMakers(e.target.value));
  };

  const selectModels: ChangeEventHandler<HTMLInputElement> = (e) => {
    const sp = new URLSearchParams(searchParams);
    if (e.target.checked) {
      sp.append(FILTER_NAME, e.target.value);
    } else {
      sp.delete(FILTER_NAME, e.target.value);
    }
    dispatch(filterModels(sp.getAll(FILTER_NAME) ?? []));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    selectModels(e);
    handleCheckChange(e);
  };

  return {
    isOpen,
    toggle,
    anyVal,
    clearFilter,
    applyFilter,
    makers,
    handleChange,
    checked,
  };
};
