"use client";
import SearchVehicles from "@/components/SearchVehicles";
import { useEffect, useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { useSearchParams } from "next/navigation";

export default function SearchVehiclesPage() {
  const p = useSearchParams();
  const makes = p.get("makes") ?? "";
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  useEffect(() => {
    if (window) {
      fetch(window.location.origin + `/api/inventory/search?makes=${makes}`)
        .then((res) => res.json())
        .then((res) => setVehicles(res.data));
    }
  }, []);
  return <SearchVehicles results={vehicles} />;
}
