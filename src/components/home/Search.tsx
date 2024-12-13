"use client";
import React, { useState } from "react";
import OffCanvasTwo from "@/components/common/OffCanvasTwo";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const p = useSearchParams();
  const query = p.get("makes") ?? "";
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <>
      <div className="container">
        <div className="search-form pt-3 rtl-flex-d-row-r">
          <form action="/vehicles/search">
            <input
              className="form-control"
              type="search"
              name="makes"
              placeholder="Buscar vehículos"
              defaultValue={query}
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
