import React from "react";
import { useSearchParams } from "next/navigation";
import { useFilters } from "@/components/common/Filters";

export default function AuctionDate() {
  const { saleDate } = useAuctionDate();
  const { handleOptionChange } = useFilters();
  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-auction-date"
          aria-controls="collapse-auction-date"
        >
          <strong>Fecha de subasta</strong>
        </button>
      </h2>
      <div
        id="collapse-auction-date"
        className="accordion-collapse collapse"
        data-bs-parent="#accordion-filters"
      >
        <div className="accordion-body">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleOptionChange}
            name="saleDate"
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
          </select>
        </div>
      </div>
    </>
  );
}

const useAuctionDate = () => {
  const searchParams = useSearchParams();
  const saleDate = searchParams.get("saleDate") ?? "";

  return { saleDate };
};
