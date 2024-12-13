import VehicleCard from "@/components/VehicleCard";
import React from "react";
import { Vehicle } from "@/types/vehicle";

export default function SearchVehicles({
  results,
}: Readonly<{ results: Vehicle[] }>) {
  return (
    <div className="top-products-area py-3">
      <div className="container">
        <div className="row g-2">
          {results.map((item) => (
            <VehicleCard vehicle={item} key={item.vin} />
          ))}
        </div>
      </div>
    </div>
  );
}
