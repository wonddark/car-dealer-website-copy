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
    <div className="widget catagory mb-4">
      <h6 className="widget-title mb-2">Daños primarios</h6>
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
