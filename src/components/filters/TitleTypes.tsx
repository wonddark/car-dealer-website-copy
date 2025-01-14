import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import React, { useEffect, useState } from "react";
import { VehicleTitle } from "@/types/vehicle";
import { useFilters } from "@/components/common/Filters";
import { useSearchParams } from "next/navigation";

export default function TitleTypes() {
  const { titleTypes, checked } = useTitleTypes();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-title-type"
          aria-controls="collapse-title-type"
        >
          <strong>Tipo de título</strong>
        </button>
      </h2>
      <div
        id="collapse-title-type"
        className="accordion-collapse collapse"
        data-bs-parent="#accordion-filters"
      >
        <div className="accordion-body">
          <FilterOptionsCheckContainer>
            {!titleTypes.loading &&
              !titleTypes.error &&
              titleTypes.data.map((item) => (
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
                  <label className="form-check-label" htmlFor={item.key}>
                    {item.meaning}
                  </label>
                </div>
              ))}
            {titleTypes.loading &&
              [0, 1, 2].map((i) => (
                <div key={i} className="placeholder">
                  <div className="form-input placeholder-glow"></div>
                </div>
              ))}
          </FilterOptionsCheckContainer>
        </div>
      </div>
    </>
  );
}

export const useTitleTypes = () => {
  const [titleTypes, setTitleTypes] = useState<{
    data: VehicleTitle[];
    loading: boolean;
    error: boolean;
  }>({ data: [], loading: true, error: false });
  useEffect(() => {
    const controller = new AbortController();
    if (window && window.location) {
      fetch(`${window.location.origin}/api/filters/vehicle-title`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((res) =>
          setTitleTypes({ data: res, loading: false, error: false }),
        )
        .catch((reason) => {
          if (reason instanceof DOMException && reason.name === "AbortError") {
            return null;
          } else {
            setTitleTypes({ data: [], loading: false, error: true });
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, []);
  const searchParams = useSearchParams();
  const checked = (titleVal: string) => {
    const titles = searchParams.getAll("TitleTypes") ?? [];

    return titles.includes(titleVal);
  };

  return { titleTypes, checked };
};
