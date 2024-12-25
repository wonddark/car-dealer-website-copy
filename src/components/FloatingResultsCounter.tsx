"use client";

import React from "react";
import useTopProducts from "@/components/home/use-top-products";

export default function FloatingResultsCounter() {
  const { response, loading, error } = useTopProducts();
  return (
    <>
      {!loading && !error && (
        <div
          className="position-fixed bottom-0 w-auto right-0 ms-auto mb-2 me-2 py-1 px-2 bg-white shadow rounded-2"
          style={{ right: 0 }}
        >
          <span className="fw-semibold">{response.totalCount}</span>
          <span className="ms-1">resultados</span>
        </div>
      )}
    </>
  );
}
