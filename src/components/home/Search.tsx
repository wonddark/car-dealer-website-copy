"use client";

import React, { useState } from "react";
import OffCanvasTwo from "@/components/common/OffCanvasTwo";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { getIsBestOffer } from "@/redux/features/vehicles.slice";
import useTopProducts from "@/components/home/use-top-products";

const Search = () => {
  const { response, loading } = useTopProducts();
  const sp = useSearchParams();
  const isBestOffer = useAppSelector(getIsBestOffer);
  const activeFilters = Array.from(sp.entries()).length + (isBestOffer ? 1 : 0);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <>
      <div className="container-xl mb-3">
        <div className="card">
          <div className="card-body">
            <div className="search-form d-lg-none2">
              <div className="alternative-search-options">
                <div className="ms-2">
                  <button
                    onClick={handleShow}
                    className="btn btn-sm text-primary"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#suhaFilterOffcanvas"
                    aria-controls="suhaFilterOffcanvas"
                  >
                    Filtros
                    {activeFilters ? (
                      <strong className="badge text-bg-primary rounded-pill ms-2">
                        {activeFilters}
                      </strong>
                    ) : null}
                  </button>
                </div>
              </div>
            </div>
            {!loading && response.totalCount > 0 && (
              <p className="mb-0 mt-2">
                <strong>{response.totalCount}</strong> vehículos encontrados
              </p>
            )}
          </div>
        </div>
      </div>

      <OffCanvasTwo handleShow={handleShow} show={show} />
    </>
  );
};

export default Search;
