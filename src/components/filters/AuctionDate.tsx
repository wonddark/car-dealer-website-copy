import React, { MouseEventHandler, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "@/components/common/Filters";
import * as Collapsible from "@radix-ui/react-collapsible";
import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { useAppDispatch } from "@/store/hooks";
import { resetData } from "@/store/features/vehicles.slice";

const FILTER_NAME = "saleDate";

export default function AuctionDate() {
  const { saleDate, isOpen, toggle, anyValue, clearFilter, handleChange } =
    useAuctionDate();
  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggle}
    >
      <Collapsible.Trigger className="btn f-trigger" asChild>
        <div className="f-trigger-inner">
          <span className="flex-fill">Fecha de subasta</span>
          {anyValue && (
            <button className="f-reset btn p-0" onClick={clearFilter}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <FilterOptionsCheckContainer>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
            name={FILTER_NAME}
            defaultValue={saleDate}
          >
            <option value="">Seleccionar</option>
            <option value="24h">Próximas 24 horas</option>
            <option value="48h">Próximas 48 horas</option>
            <option value="72h">Próximas 72 horas</option>
            <option value="7d">Próximos 7 días</option>
            <option value="15d">Próximos 15 días</option>
            <option value="30d">Próximos 30 días</option>
            <option value="3m">Próximos 3 meses</option>
            <option value="6m">Próximos 6 meses</option>
            <option value="custom">Personalizada</option>
          </select>
        </FilterOptionsCheckContainer>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

const useAuctionDate = () => {
  const { handleOptionChange: handleChange } = useFilters();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const saleDate = searchParams.get("saleDate") ?? "";

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const anyValue = saleDate !== "";

  const clearFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams);
    sp.delete(FILTER_NAME);

    push(`${pathname}?${sp}`);
  };

  return { saleDate, handleChange, isOpen, toggle, anyValue, clearFilter };
};
