"use client";

import React from "react";
import useVehiclesInventory from "@/hooks/useVehiclesInventory";

export default function FloatingResultsCounter() {
  const { response, loading, error } = useVehiclesInventory();
  return (
    <>
      {!loading && !error && (
        <div
          className="position-fixed bottom-0 w-auto right-0 ms-auto mb-2 me-2 py-1 px-2 bg-white shadow rounded-2 vstack gap-1 align-items-center"
          style={{ right: 0 }}
        >
          <span className="fw-medium">{response.totalCount}</span>
          <small className="ms-1">resultados</small>
        </div>
      )}
    </>
  );
}
