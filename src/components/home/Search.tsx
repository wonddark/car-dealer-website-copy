"use client";
import React, { useState } from "react";
import OffCanvasTwo from "@/components/common/OffCanvasTwo";

const Search = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <>
      <div className="container">
        <div className="search-form pt-3 rtl-flex-d-row-r">
          <form>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar vehículos"
            />
            <button type="submit">
              <i className="ti ti-search"></i>
            </button>
          </form>

          <div className="alternative-search-options">
            <div
              className="filter-option ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#suhaFilterOffcanvas"
              aria-controls="suhaFilterOffcanvas"
            >
              <button
                onClick={() => handleShow()}
                className="text-primary p-1 rounded-2"
              >
                <i className="ti ti-adjustments-horizontal"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <OffCanvasTwo handleShow={handleShow} show={show} />
    </>
  );
};

export default Search;
