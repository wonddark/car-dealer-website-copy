"use client";
import React from "react";
import { useFilters } from "@/components/common/Filters";

export default function OrderBySelector() {
  const { handleOptionChange, orderBy } = useFilters();

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      name="SortBy"
      onChange={handleOptionChange}
      defaultValue={orderBy}
    >
      <option value="">Ordenar por</option>
      <option value="BuyNowPrice">Precio de venta</option>
      <option value="Mileage">Cantidad de millas</option>
      <option value="SaleDate">Fecha de subasta</option>
      <option value="HighBid">Oferta actual</option>
      <option value="Make">Marca</option>
      <option value="Model">Modelo</option>
      <option value="Year">Año</option>
    </select>
  );
}
