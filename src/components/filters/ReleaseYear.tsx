import { YEARS } from "@/data/options";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useFilters } from "@/components/common/Filters";

export default function ReleaseYear() {
  const { from, to } = useReleaseYear();
  const { handleOptionChange } = useFilters();
  return (
    <div className="widget price-range mb-4">
      <h6 className="widget-title mb-2">Año</h6>
      <div className="widget-desc">
        <div className="hstack gap-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleOptionChange}
            name="YearFrom"
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
            name="YearTo"
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
      </div>
    </div>
  );
}

const useReleaseYear = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("YearFrom") ?? "";
  const to = searchParams.get("YearTo") ?? "";

  return { from, to };
};
