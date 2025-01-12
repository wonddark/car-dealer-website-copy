"use client";

import React, { useState } from "react";
import OffCanvasTwo from "@/components/common/OffCanvasTwo";
import useVehiclesInventory from "@/hooks/useVehiclesInventory";
import FiltersBanner from "@/components/FiltersBanner";
import { useFilters } from "@/components/common/Filters";
import OrderBySelector from "@/components/OrderBySelector";

const Search = () => {
  const { response, loading } = useVehiclesInventory();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const { orderActive, changeSort } = useFilters();
  return (
    <>
      <div className="card d-none d-lg-block">
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
                  <OrderBySelector />
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
