"use client";
import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import React, { useEffect, useState } from "react";
import { VehicleType } from "@/types/vehicle";
import VehicleTypeInput from "@/components/filters/VehicleTypeInput";

export default function VehicleTypes() {
  const { data } = useVehicleTypes();

  return (
    <div className="widget catagory mb-4">
      <h6 className="widget-title mb-2">Tipo de vehículo</h6>
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
  );
}

export const useVehicleTypes = () => {
  const [data, setData] = useState<VehicleType[]>([]);
  useEffect(() => {
    (async function () {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/filters/vehicle-type`,
      ).then((res) => res.json());
      setData(res);
    })();
  }, []);

  return { data };
};
