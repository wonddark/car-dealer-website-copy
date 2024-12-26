"use client";

import React, { useState } from "react";
import OffCanvasTwo from "@/components/common/OffCanvasTwo";
import useTopProducts from "@/components/home/use-top-products";
import FiltersBanner from "@/components/FiltersBanner";

const Search = () => {
  const { response, loading } = useTopProducts();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <>
      <div className="container-xl py-3">
        <div className="card">
          <div className="card-body">
            <div className="vstack gap-2">
              <div className="hstack align-items-stretch gap-2">
                <input
                  type="search"
                  className="form-control border-secondary"
                  placeholder="Buscar por marca, modelo o VIN"
                />
              </div>
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
                <p className="m-0">
                  <strong className="text-primary-emphasis">
                    {response.totalCount}
                  </strong>{" "}
                  vehículos encontrados
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <OffCanvasTwo handleShow={handleShow} show={show} />
    </>
  );
};

export default Search;
