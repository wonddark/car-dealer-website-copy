"use client";

import React from "react";
import useVehiclesInventory from "@/hooks/useVehiclesInventory";
import InfiniteVehiclesList from "@/components/InfiniteVehiclesList";

const TopProducts = () => {
  const { response, loading, error, getNextPage } = useVehiclesInventory();
  return (
    <InfiniteVehiclesList
      response={response}
      requestStatus={{ loading, error }}
      getNextPage={getNextPage}
    />
  );
};

export default TopProducts;
