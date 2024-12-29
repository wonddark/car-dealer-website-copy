"use client";

import React, { useState } from "react";
import OffCanvasTwo from "@/components/common/OffCanvasTwo";
import useVehiclesInventory from "@/hooks/useVehiclesInventory";
import FiltersBanner from "@/components/FiltersBanner";
import { useFilters } from "@/components/common/Filters";

const Search = () => {
  const { response, loading } = useVehiclesInventory();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const { handleFilterYearChange, orderBySelected, orderActive, changeSort } =
    useFilters();
  return (
    <>
      <div className="card">
        <div className="card-body p-2 p-md-3">
          <div className="vstack gap-2">
            <div className="hstack gap-2">
              <button
                onClick={handleShow}
                className="btn btn-outline-primary d-lg-none d-flex align-items-center gap-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#suhaFilterOffcanvas"
                aria-controls="suhaFilterOffcanvas"
              >
                <span>Filtros</span>
                <i className="ti ti-filter"></i>
              </button>
              <FiltersBanner />
            </div>
            {!loading && response.totalCount > 0 && (
              <div className="hstack justify-content-between">
                <p className="m-0">
                  <strong className="text-primary-emphasis">
                    {response.totalCount}
                  </strong>{" "}
                  vehículos encontrados
                </p>
                <div className="hstack gap-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="SortBy"
                    onChange={handleFilterYearChange}
                  >
                    <option selected={orderBySelected("")} value="">
                      Ordenar por
                    </option>
                    <option
                      selected={orderBySelected("BuyNowPrice")}
                      value="BuyNowPrice"
                    >
                      Precio de venta
                    </option>
                    <option
                      selected={orderBySelected("Mileage")}
                      value="Mileage"
                    >
                      Cantidad de millas
                    </option>
                    <option
                      selected={orderBySelected("SaleDate")}
                      value="SaleDate"
                    >
                      Fecha de subasta
                    </option>
                    <option
                      selected={orderBySelected("HighBid")}
                      value="HighBid"
                    >
                      Oferta actual
                    </option>
                    <option selected={orderBySelected("Make")} value="Make">
                      Marca
                    </option>
                    <option selected={orderBySelected("Model")} value="Model">
                      Modelo
                    </option>
                    <option selected={orderBySelected("Year")} value="Year">
                      Año
                    </option>
                  </select>
                  <div className="hstack">
                    <button
                      type="button"
                      className={`btn btn-light${orderActive("false") ? " active" : ""}`}
                      data-bs-toggle="button"
                      aria-pressed={orderActive("false")}
                      onClick={() => changeSort("false")}
                    >
                      <i className="ti ti-sort-ascending"></i>
                    </button>
                    <button
                      type="button"
                      className={`btn btn-light${orderActive("true") ? " active" : ""}`}
                      data-bs-toggle="button"
                      aria-pressed={orderActive("true")}
                      onClick={() => changeSort("true")}
                    >
                      <i className="ti ti-sort-descending"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <OffCanvasTwo handleShow={handleShow} show={show} />
    </>
  );
};

export default Search;
