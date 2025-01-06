import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import { primaryDamagesDict } from "@/data/translations";
import React, { useEffect, useState } from "react";
import { useFilters } from "@/components/common/Filters";
import { useSearchParams } from "next/navigation";

export default function PrimaryDamages() {
  const { damages, checked } = usePrimaryDamages();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-primary-damages"
          aria-controls="collapse-primary-damages"
        >
          <strong>Daños primarios</strong>
        </button>
      </h2>
      <div
        id="collapse-primary-damages"
        className="accordion-collapse collapse"
        data-bs-parent="#accordion-filters"
      >
        <div className="accordion-body">
          <FilterOptionsCheckContainer>
            {damages.data.map((item) => (
              <div key={item + uuidv4()} className="form-check">
                <input
                  className="form-check-input"
                  id={item}
                  type="checkbox"
                  name="PrimaryDamages"
                  value={item}
                  onChange={handleChange}
                  checked={checked(item)}
                />
                <label className="form-check-label" htmlFor={item}>
                  {primaryDamagesDict[item]}
                </label>
              </div>
            ))}
          </FilterOptionsCheckContainer>
        </div>
      </div>
    </>
  );
}

const usePrimaryDamages = () => {
  const searchParams = useSearchParams();
  const [damages, setDamages] = useState<{
    data: string[];
    loading: boolean;
    error: boolean;
  }>({ data: [], loading: true, error: false });

  const checked = (value: string) => {
    const damages = searchParams.getAll("PrimaryDamages") ?? [];

    return damages.includes(value);
  };

  const getPrimaryDamages = () => {
    const controller = new AbortController();
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters/primary-damages`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setDamages({ data, loading: false, error: false }))
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return null;
        } else {
          setDamages({ data: [], loading: false, error: true });
        }
      });

    return () => {
      controller.abort();
    };
  };

  useEffect(getPrimaryDamages, []);

  return { damages, checked };
};
