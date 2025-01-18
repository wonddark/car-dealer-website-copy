import { YEARS } from "@/data/options";
import React, { MouseEventHandler, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "@/components/common/Filters";
import * as Collapsible from "@radix-ui/react-collapsible";
import { resetData } from "@/store/features/vehicles.slice";
import { useAppDispatch } from "@/store/hooks";

const FILTER_FROM_NAME = "YearFrom";
const FILTER_TO_NAME = "YearTo";

export default function ReleaseYear() {
  const { from, to, isOpen, toggle, anyValue, clearFilter } = useReleaseYear();
  const { handleOptionChange } = useFilters();
  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="f-trigger" asChild>
        <div className="f-trigger-inner">
          <strong className="flex-fill">Año de fabricación</strong>
          {anyValue && (
            <button className="f-reset btn" onClick={clearFilter}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <div className="hstack gap-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleOptionChange}
            name={FILTER_FROM_NAME}
            defaultValue={from}
          >
            <option value="">Desde</option>
            {YEARS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleOptionChange}
            name={FILTER_TO_NAME}
            defaultValue={to}
          >
            <option value="">Hasta</option>
            {YEARS.map((item) => (
              <option
                key={item}
                value={item}
                disabled={Boolean(from && Number(from) > Number(item))}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

const useReleaseYear = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const pathname = usePathname();

  const from = searchParams.get("YearFrom") ?? "";
  const to = searchParams.get("YearTo") ?? "";
  const anyValue = Boolean(from) || Boolean(to);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const clearFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams);
    sp.delete(FILTER_FROM_NAME);
    sp.delete(FILTER_TO_NAME);

    push(`${pathname}?${sp}`);
  };

  return { from, to, isOpen, toggle, anyValue, clearFilter };
};
