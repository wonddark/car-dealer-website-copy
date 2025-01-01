import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useFilters } from "@/components/common/Filters";
import { useSearchParams } from "next/navigation";

export default function FuelType() {
  const { checked } = useFuelTypes();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <div className="widget catagory mb-4">
      <h6 className="widget-title mb-2">Tipo de combustible</h6>
      <FilterOptionsCheckContainer>
        {[
          "Gasoline",
          "Gasoline Hybrid",
          "Gasoline Plug-In Hybrid",
          "Electric",
          "Diesel",
          "Flex",
        ].map((item) => (
          <div key={item + uuidv4()} className="form-check">
            <input
              className="form-check-input"
              id={item}
              type="checkbox"
              name="FuelTypes"
              value={item}
              onChange={handleChange}
              checked={checked(item)}
            />
            <label className="form-check-label" htmlFor={item}>
              {item}
            </label>
          </div>
        ))}
      </FilterOptionsCheckContainer>
    </div>
  );
}

const useFuelTypes = () => {
  const searchParams = useSearchParams();
  const checked = (titleVal: string) => {
    const fuelTypes = searchParams.getAll("FuelTypes") ?? [];
    return fuelTypes.includes(titleVal);
  };

  return { checked };
};
