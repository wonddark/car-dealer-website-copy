import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import React, { useState } from "react";
import { useFilters } from "@/components/common/Filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { getTitles, getTitlesCounters } from "@/store/features/filters.slice";
import * as Collapsible from "@radix-ui/react-collapsible";

export default function TitleTypes() {
  const { titles, checked, isOpen, toggle, anyVal, clearFilters } =
    useTitleTypes();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="f-trigger" asChild>
        <div className="f-trigger-inner">
          <strong className="flex-fill">Tipo de título</strong>
          {anyVal && (
            <button className="f-reset btn" onClick={clearFilters}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <FilterOptionsCheckContainer>
          {titles.map((item) => (
            <div key={item.key} className="form-check">
              <input
                className="form-check-input"
                id={item.key}
                type="checkbox"
                name="TitleTypes"
                value={item.key}
                onChange={handleChange}
                checked={checked(item.key)}
              />
              <label
                className="form-check-label d-inline-flex justify-content-between w-100"
                htmlFor={item.key}
              >
                <span>{item.meaning}</span>
                <span>{item.count}</span>
              </label>
            </div>
          ))}
        </FilterOptionsCheckContainer>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export const useTitleTypes = () => {
  const data = useAppSelector(getTitles);
  const counters = useAppSelector(getTitlesCounters);

  const titles = data.map((item) => ({
    ...item,
    count: (counters as { [k: string]: number } | undefined)?.[item.key] ?? 0,
  }));

  const searchParams = useSearchParams();
  const checked = (titleVal: string) => {
    const queries = searchParams.getAll("TitleTypes") ?? [];

    return queries.includes(titleVal);
  };
  const anyVal = Boolean((searchParams.getAll("TitleTypes") ?? []).length);

  const { push } = useRouter();
  const pathname = usePathname();
  const clearFilters = () => {
    const query = new URLSearchParams(searchParams);
    query.delete("TitleTypes");
    push(pathname + query);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return { titles, checked, isOpen, toggle, anyVal, clearFilters };
};
