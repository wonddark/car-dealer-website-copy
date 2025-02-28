import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import React, { MouseEventHandler, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "@/components/common/Filters";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getDealers } from "@/store/features/filters.slice";
import * as Collapsible from "@radix-ui/react-collapsible";
import { resetData } from "@/store/features/vehicles.slice";

const FILTER_NAME = "Auction";

export default function DealersNames() {
  const { auctions, checked, isOpen, toggle, anyValue, clearFilter } =
    useAuctionNames();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="btn f-trigger" asChild>
        <div className="f-trigger-inner">
          <span className="flex-fill">Vendedor</span>
          {anyValue && (
            <button className="f-reset btn p-0" onClick={clearFilter}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <FilterOptionsCheckContainer>
          {auctions.map((item) => (
            <div key={item.key + uuidv4()} className="form-check">
              <input
                className="form-check-input"
                id={item.key}
                type="checkbox"
                name="Auction"
                value={item.key}
                onChange={handleChange}
                checked={checked(item.key)}
                disabled={item.count === 0}
              />
              <label
                className="form-check-label d-inline-flex justify-content-between w-100"
                htmlFor={item.key}
              >
                <span>{item.label}</span>
                <span>{item.count}</span>
              </label>
            </div>
          ))}
        </FilterOptionsCheckContainer>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

const useAuctionNames = () => {
  const auctions = useAppSelector(getDealers);
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const checked = (name: string) => {
    const auctions = searchParams.getAll(FILTER_NAME) ?? [];

    return auctions.includes(name);
  };
  const anyValue = Boolean((searchParams.getAll(FILTER_NAME) ?? []).length);
  const clearFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    const sp = new URLSearchParams(searchParams);
    sp.delete(FILTER_NAME);
    dispatch(resetData());

    push(`${pathname}?${sp}`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { auctions, checked, isOpen, toggle, anyValue, clearFilter };
};
