"use client";
import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import React, { useEffect, useState } from "react";
import { VehicleType } from "@/types/vehicle";
import VehicleTypeInput from "@/components/filters/VehicleTypeInput";

export default function VehicleTypes() {
  const { data } = useVehicleTypes();

  return (
    <>
      <h2 className="accordion-header position-relative">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-controls="collapseOne"
        >
          <strong>Tipo de vehículo</strong>
        </button>
      </h2>
      <div
        id="collapseOne"
        className="accordion-collapse collapse"
        data-bs-parent="#accordion-filters"
        aria-expanded="false"
      >
        <div className="accordion-body">
          <FilterOptionsCheckContainer>
            {data.map((item: VehicleType) => (
              <div key={item.key} className="form-check">
                <VehicleTypeInput value={item.key} />
                <label className="form-check-label" htmlFor={item.key}>
                  {item.type}
                </label>
              </div>
            ))}
          </FilterOptionsCheckContainer>
        </div>
      </div>
    </>
  );
}

export const useVehicleTypes = () => {
  const [data, setData] = useState<VehicleType[]>([]);
  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/filters/vehicle-type`,
        ).then((res) => res.json());
        setData(res);
      } catch (e) {
        console.error("Got this error", e);
        setData([]);
      }
    })();
  }, []);

  return { data };
};
