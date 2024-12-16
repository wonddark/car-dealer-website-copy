"use client";

import React, { MouseEventHandler, useCallback, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { resetData } from "@/redux/features/vehicles.slice";
import { BRANDS, MODELS, TITLE_TYPES } from "@/data/hardcoded";

const OffCanvasTwo = ({
  handleShow,
  show,
}: Readonly<{
  handleShow: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
}>) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const r = useRouter();
  const searchParams = useSearchParams();
  const [brands, setBrands] =
    useState<{ value: string; label: string }[]>(BRANDS);
  const [models, setModels] =
    useState<{ value: string; label: string }[]>(MODELS);
  const createQueryString = useCallback(
    (...params: { name: string; value: string; add: boolean }[]) => {
      const sp = new URLSearchParams(searchParams.toString());
      for (const param of params) {
        if (param.add) {
          sp.append(param.name, param.value);
        } else {
          sp.delete(param.name, param.value);
        }
      }
      return sp.toString();
    },
    [searchParams],
  );
  const auctionName = useRef<HTMLInputElement>(null);
  const auctionState = useRef<HTMLInputElement>(null);
  const odometerMin = useRef<HTMLInputElement>(null);
  const odometerMax = useRef<HTMLInputElement>(null);

  const applyFilters = () => {
    dispatch(resetData());
    r.push(
      pathname +
        "?" +
        createQueryString(
          {
            name: "Auction",
            value: auctionName.current?.value ?? "",
            add: true,
          },
          {
            name: "State",
            value: auctionState.current?.value ?? "",
            add: true,
          },
          {
            name: "OdometerFrom",
            value: odometerMin.current?.value ?? "",
            add: true,
          },
          {
            name: "OdometerTo",
            value: odometerMax.current?.value ?? "",
            add: true,
          },
        ),
    );
  };

  return (
    <div
      className={`offcanvas offcanvas-start suha-filter-offcanvas-wrap ${
        show ? "show" : ""
      }`}
      tabIndex={-1}
      id="suhaFilterOffcanvas"
      aria-labelledby="suhaFilterOffcanvasLabel"
    >
      <button
        onClick={handleShow}
        className="btn-close text-reset"
        type="button"
        data-bs-dismiss="offcanvas"
        aria-label="Cerrar"
      ></button>

      <div className="offcanvas-body py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="widget catagory mb-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={({ target: { checked } }) => {
                      if (checked) {
                        dispatch(resetData());
                        r.push(
                          pathname +
                            "?" +
                            createQueryString({
                              name: "InBuyNow",
                              value: "true",
                              add: true,
                            }),
                        );
                      } else {
                        dispatch(resetData());
                        r.push(
                          pathname +
                            "?" +
                            createQueryString({
                              name: "InBuyNow",
                              value: "true",
                              add: false,
                            }),
                        );
                      }
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Para comprar ahora
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="widget catagory mb-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="best-offer"
                    defaultChecked
                    onChange={({ target: { checked } }) => {
                      if (checked) {
                        dispatch(resetData());
                        r.push(
                          pathname +
                            "?" +
                            createQueryString({
                              name: "isBestOffert",
                              value: "true",
                              add: true,
                            }),
                        );
                      } else {
                        dispatch(resetData());
                        r.push(
                          pathname +
                            "?" +
                            createQueryString({
                              name: "isBestOffert",
                              value: "true",
                              add: false,
                            }),
                        );
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor="best-offer">
                    Solo mejores ofertas
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="widget catagory mb-4">
                <h6 className="widget-title mb-2">Marca</h6>
                <div className="position-relative">
                  <input
                    className="w-100 position-sticky top-0"
                    type="search"
                    onChange={({ target: { value } }) =>
                      setBrands(
                        BRANDS.filter(
                          (item) =>
                            item.label.includes(value) ||
                            item.value.includes(value),
                        ),
                      )
                    }
                  />
                  <div
                    className="widget-desc mt-2 w-100"
                    style={{
                      maxHeight: 200,
                      overflow: "auto",
                    }}
                  >
                    {brands.map((item) => (
                      <div key={item.value} className="form-check">
                        <input
                          className="form-check-input"
                          id={item.value}
                          type="checkbox"
                          name="Makes"
                          value={item.value}
                          onChange={({ target: { value, checked } }) => {
                            if (checked) {
                              dispatch(resetData());
                              r.push(
                                pathname +
                                  "?" +
                                  createQueryString({
                                    name: "Makes",
                                    value,
                                    add: true,
                                  }),
                              );
                            } else {
                              dispatch(resetData());
                              r.push(
                                pathname +
                                  "?" +
                                  createQueryString({
                                    name: "Makes",
                                    value,
                                    add: false,
                                  }),
                              );
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={item.value}
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="widget catagory mb-4">
                <h6 className="widget-title mb-2">Modelo</h6>
                <div className="position-relative">
                  <input
                    className="w-100"
                    type="search"
                    onChange={({ target: { value } }) =>
                      setModels(
                        MODELS.filter(
                          (item) =>
                            item.value === value || item.label === value,
                        ),
                      )
                    }
                  />
                  <div
                    className="widget-desc mt-2 w-100 position-sitcky top-0"
                    style={{
                      maxHeight: 200,
                      overflow: "auto",
                    }}
                  >
                    {models.map((item) => (
                      <div key={item.value} className="form-check">
                        <input
                          className="form-check-input"
                          id={item.value}
                          type="checkbox"
                          name="model"
                          value={item.value}
                          onChange={({ target: { value, checked } }) => {
                            if (checked) {
                              dispatch(resetData());
                              r.push(
                                pathname +
                                  "?" +
                                  createQueryString({
                                    name: "Models",
                                    value,
                                    add: true,
                                  }),
                              );
                            } else {
                              dispatch(resetData());
                              r.push(
                                pathname +
                                  "?" +
                                  createQueryString({
                                    name: "Models",
                                    value,
                                    add: false,
                                  }),
                              );
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={item.value}
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="widget catagory mb-4">
                <h6 className="widget-title mb-2">Tipo de título</h6>
                <div className="widget-desc mt-2 w-100 position-sitcky top-0">
                  {TITLE_TYPES.map((item) => (
                    <div key={item.value} className="form-check">
                      <input
                        className="form-check-input"
                        id={item.value}
                        type="checkbox"
                        name="model"
                        value={item.value}
                        onChange={({ target: { value, checked } }) => {
                          if (checked) {
                            dispatch(resetData());
                            r.push(
                              pathname +
                                "?" +
                                createQueryString({
                                  name: "TitleTypes",
                                  value,
                                  add: true,
                                }),
                            );
                          } else {
                            dispatch(resetData());
                            r.push(
                              pathname +
                                "?" +
                                createQueryString({
                                  name: "TitleTypes",
                                  value,
                                  add: false,
                                }),
                            );
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor={item.value}>
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="widget color mb-4">
                <div className="widget-desc">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subasta"
                      ref={auctionName}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Estado"
                      ref={auctionState}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="widget price-range mb-4">
                <h6 className="widget-title mb-2">Odómetro</h6>
                <div className="widget-desc">
                  <div className="row g-2">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          className="form-control"
                          id="floatingInput"
                          type="text"
                          placeholder="1"
                          ref={odometerMin}
                        />
                        <label htmlFor="floatingInput">Min</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          className="form-control"
                          id="floatingInput"
                          type="text"
                          placeholder="1"
                          ref={odometerMax}
                        />
                        <label htmlFor="floatingInput">Max</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-lg btn-primary w-100"
                onClick={applyFilters}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffCanvasTwo;
