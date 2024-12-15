"use client";

import React from "react";
import useTopProducts from "@/components/home/use-top-products";
import InfiniteVehiclesList from "@/components/InfiniteVehiclesList";

const TopProducts = () => {
  const { response, requestStatus, getNextPage } = useTopProducts();
  return (
    <InfiniteVehiclesList
      response={response}
      requestStatus={requestStatus}
      getNextPage={getNextPage}
    />
  );
};

export default TopProducts;
