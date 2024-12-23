"use client";

import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BRANDS, MODELS } from "@/data/hardcoded";
import {
  getIsBestOffer,
  resetData,
  toggleBestOffer,
  toggleLoading,
} from "@/redux/features/vehicles.slice";
import { VehicleTitle, VehicleType } from "@/types/vehicle";
import OdometerFilter from "@/components/common/OdometerFilter";
import { YEARS } from "@/data/options";

export default function Filters() {
  const {
    brands,
    models,
    odometerMin,
    odometerMax,
    vehicleTypes,
    titleTypes,
    bestOfferChecked,
    buyNowChecked,
    auctionName,
    auctionState,
    handleToggleBestOffer,
    handleCheckChange,
    filterBrands,
    filterModels,
    auctionVal,
    stateVal,
    yearFrom,
    yearTo,
    brandChecked,
    modelChecked,
    vehicleTypeChecked,
    titleChecked,
    applyFilters,
    handleFilterYearChange,
  } = useFilters();
  return (
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
                  name="InBuyNow"
                  value="true"
                  onChange={handleCheckChange}
                  defaultChecked={buyNowChecked}
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
                  name="IsBestOffer"
                  value="true"
                  defaultChecked={bestOfferChecked}
                  onChange={handleToggleBestOffer}
                />
                <label className="form-check-label" htmlFor="best-offer">
                  Solo mejores ofertas
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="widget catagory mb-4">
              <h6 className="widget-title mb-2">Tipo de vehículo</h6>
              <div
                className="widget-desc mt-2 w-100 position-sitcky top-0"
                style={{
                  maxHeight: 130,
                  overflow: "auto",
                }}
              >
                {!vehicleTypes.loading &&
                  !vehicleTypes.error &&
                  vehicleTypes.data.map((item) => (
                    <div key={item.key} className="form-check">
                      <input
                        className="form-check-input"
                        id={item.key}
                        type="checkbox"
                        name="VehicleTypes"
                        value={item.key}
                        onChange={handleCheckChange}
                        defaultChecked={vehicleTypeChecked(item.key)}
                      />
                      <label className="form-check-label" htmlFor={item.key}>
                        {item.type}
                      </label>
                    </div>
                  ))}
                {vehicleTypes.loading &&
                  [0, 1, 2].map((i) => (
                    <div key={i} className="placeholder">
                      <div className="form-input placeholder-glow"></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="widget price-range mb-4">
              <h6 className="widget-title mb-2">Odómetro</h6>
              <div className="widget-desc">
                <OdometerFilter />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="widget price-range mb-4">
              <h6 className="widget-title mb-2">Año</h6>
              <div className="widget-desc">
                <div className="hstack gap-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleFilterYearChange}
                    name="YearFrom"
                    defaultValue={yearFrom}
                  >
                    <option value="">Escoge un año</option>
                    {YEARS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleFilterYearChange}
                    name="YearTo"
                    defaultValue={yearTo}
                  >
                    <option value="">Escoge un año</option>
                    {YEARS.map((item) => (
                      <option
                        key={item}
                        value={item}
                        disabled={Boolean(
                          yearFrom && Number(yearFrom) > Number(item),
                        )}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="widget catagory mb-4">
              <h6 className="widget-title mb-2">Tipo de título</h6>
              <div
                className="widget-desc mt-2 w-100 position-sitcky top-0"
                style={{
                  maxHeight: 130,
                  overflow: "auto",
                }}
              >
                {!titleTypes.loading &&
                  !titleTypes.error &&
                  titleTypes.data.map((item) => (
                    <div key={item.key} className="form-check">
                      <input
                        className="form-check-input"
                        id={item.key}
                        type="checkbox"
                        name="TitleTypes"
                        value={item.key}
                        onChange={handleCheckChange}
                        defaultChecked={titleChecked(item.key)}
                      />
                      <label className="form-check-label" htmlFor={item.key}>
                        {item.meaning}
                      </label>
                    </div>
                  ))}
                {titleTypes.loading &&
                  [0, 1, 2].map((i) => (
                    <div key={i} className="placeholder">
                      <div className="form-input placeholder-glow"></div>
                    </div>
                  ))}
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
                  onChange={filterBrands}
                />
                <div
                  className="widget-desc mt-2 w-100"
                  style={{
                    maxHeight: 130,
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
                        onChange={handleCheckChange}
                        defaultChecked={brandChecked(item.value)}
                      />
                      <label className="form-check-label" htmlFor={item.value}>
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
                  onChange={filterModels}
                />
                <div
                  className="widget-desc mt-2 w-100 position-sitcky top-0"
                  style={{
                    maxHeight: 130,
                    overflow: "auto",
                  }}
                >
                  {models.map((item) => (
                    <div key={item.value} className="form-check">
                      <input
                        className="form-check-input"
                        id={item.value}
                        type="checkbox"
                        name="Models"
                        value={item.value}
                        onChange={handleCheckChange}
                        defaultChecked={modelChecked(item.value)}
                      />
                      <label className="form-check-label" htmlFor={item.value}>
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
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
                    defaultValue={auctionVal}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Estado"
                    ref={auctionState}
                    defaultValue={stateVal}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn btn-lg btn-primary w-100"
              disabled={
                !auctionName.current?.value &&
                !auctionState.current?.value &&
                !odometerMin &&
                !odometerMax
              }
              onClick={applyFilters}
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const useFilters = () => {
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
    dispatch(toggleLoading());
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

  const isBestOffer = useAppSelector(getIsBestOffer);
  const handleToggleBestOffer: ChangeEventHandler<HTMLInputElement> = () => {
    dispatch(toggleBestOffer());
  };

  const handleCheckChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { checked, name, value },
    } = e;
    dispatch(toggleLoading());
    dispatch(resetData());
    if (checked) {
      r.push(
        pathname +
          "?" +
          createQueryString({
            name,
            value,
            add: true,
          }),
      );
    } else {
      r.push(
        pathname +
          "?" +
          createQueryString({
            name,
            value,
            add: false,
          }),
      );
    }
  };

  const filterBrands: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value },
    } = e;
    setBrands(
      BRANDS.filter(
        (item) => item.label.includes(value) || item.value.includes(value),
      ),
    );
  };

  const filterModels: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value },
    } = e;
    setModels(
      MODELS.filter(
        (item) => item.label.includes(value) || item.value.includes(value),
      ),
    );
  };

  const [vehicleTypes, setVehicleTypes] = useState<{
    data: VehicleType[];
    loading: boolean;
    error: boolean;
  }>({ data: [], loading: true, error: false });
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters/vehicle-type`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((res) =>
        setVehicleTypes({ data: res, loading: false, error: false }),
      )
      .catch(() => setVehicleTypes({ data: [], loading: false, error: true }));

    return () => {
      controller.abort();
    };
  }, []);

  const [titleTypes, setTitleTypes] = useState<{
    data: VehicleTitle[];
    loading: boolean;
    error: boolean;
  }>({ data: [], loading: true, error: false });
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters/vehicle-title`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((res) => setTitleTypes({ data: res, loading: false, error: false }))
      .catch(() => setTitleTypes({ data: [], loading: false, error: true }));

    return () => {
      controller.abort();
    };
  }, []);

  const bestOfferChecked = isBestOffer;
  const buyNowChecked = Boolean(searchParams.get("InBuyNow"));
  const odometerMinVal = searchParams.get("OdometerFrom") ?? undefined;
  const odometerMaxVal = searchParams.get("OdometerTo") ?? undefined;
  const auctionVal = searchParams.get("Auction") ?? undefined;
  const stateVal = searchParams.get("State") ?? undefined;
  const brandChecked = (brandVal: string) => {
    const brands = searchParams.getAll("Makes") ?? [];

    return brands.includes(brandVal);
  };
  const modelChecked = (modeldVal: string) => {
    const models = searchParams.getAll("Models") ?? [];

    return models.includes(modeldVal);
  };
  const vehicleTypeChecked = (typeVal: string) => {
    const types = searchParams.getAll("VehicleTypes") ?? [];

    return types.includes(typeVal);
  };
  const titleChecked = (titleVal: string) => {
    const titles = searchParams.getAll("TitleTypes") ?? [];

    return titles.includes(titleVal);
  };

  const yearFrom = searchParams.get("YearFrom") ?? "";
  const yearTo = searchParams.get("YearTo") ?? "";
  const handleFilterYearChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { name, value },
  }) => {
    dispatch(toggleLoading());
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams.toString());
    if (value !== "") {
      sp.set(name, value);
    } else {
      sp.delete(name);
    }
    r.push(pathname + "?" + sp);
  };

  return {
    brands,
    models,
    auctionName,
    auctionState,
    odometerMin,
    odometerMax,
    vehicleTypes,
    titleTypes,
    bestOfferChecked,
    buyNowChecked,
    odometerMinVal,
    odometerMaxVal,
    auctionVal,
    stateVal,
    yearFrom,
    yearTo,
    brandChecked,
    modelChecked,
    vehicleTypeChecked,
    titleChecked,
    handleToggleBestOffer,
    handleCheckChange,
    filterBrands,
    filterModels,
    applyFilters,
    handleFilterYearChange,
  };
};
