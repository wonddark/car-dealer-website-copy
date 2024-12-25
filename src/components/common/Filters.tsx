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
import {
  getIsBestOffer,
  resetData,
  toggleBestOffer,
  toggleLoading,
} from "@/redux/features/vehicles.slice";
import { VehicleTitle, VehicleType } from "@/types/vehicle";
import OdometerFilter from "@/components/common/OdometerFilter";
import { YEARS } from "@/data/options";
import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";

export default function Filters() {
  const {
    brandsAndModels,
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
                  checked={buyNowChecked}
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
                  checked={bestOfferChecked}
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
              <FilterOptionsCheckContainer>
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
                        checked={vehicleTypeChecked(item.key)}
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
              </FilterOptionsCheckContainer>
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
                <div className="hstack gap-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleFilterYearChange}
                    name="YearFrom"
                    defaultValue={yearFrom}
                  >
                    <option value="">Desde</option>
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
                    <option value="">Hasta</option>
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
              <FilterOptionsCheckContainer>
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
                        checked={titleChecked(item.key)}
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
              </FilterOptionsCheckContainer>
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
                <FilterOptionsCheckContainer>
                  {!brandsAndModels.loading &&
                    !brandsAndModels.error &&
                    brandsAndModels.brands.map((item) => (
                      <div key={item + uuidv4()} className="form-check">
                        <input
                          className="form-check-input"
                          id={item}
                          type="checkbox"
                          name="Makes"
                          value={item}
                          onChange={handleCheckChange}
                          checked={brandChecked(item)}
                        />
                        <label className="form-check-label" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    ))}
                  {brandsAndModels.loading &&
                    [0, 1, 2].map((i) => (
                      <div key={i} className="placeholder">
                        <div className="form-input placeholder-glow"></div>
                      </div>
                    ))}
                </FilterOptionsCheckContainer>
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
                <FilterOptionsCheckContainer>
                  {!brandsAndModels.loading &&
                    !brandsAndModels.error &&
                    brandsAndModels.models.map((item) => (
                      <div key={item + uuidv4()} className="form-check">
                        <input
                          className="form-check-input"
                          id={item}
                          type="checkbox"
                          name="Models"
                          value={item}
                          onChange={handleCheckChange}
                          checked={modelChecked(item)}
                        />
                        <label className="form-check-label" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    ))}
                  {brandsAndModels.loading &&
                    [0, 1, 2].map((i) => (
                      <div key={i} className="placeholder">
                        <div className="form-input placeholder-glow"></div>
                      </div>
                    ))}
                </FilterOptionsCheckContainer>
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
                !auctionName.current?.value && !auctionState.current?.value
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

export const useFilters = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const r = useRouter();
  const searchParams = useSearchParams();

  const [brandsAndModels, setBrandsAndModels] = useState<{
    original: Record<string, string[]>;
    brands: string[];
    models: string[];
    loading: boolean;
    error: boolean;
  }>({ original: {}, brands: [], models: [], loading: true, error: false });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters/brands-models`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) =>
        setBrandsAndModels({
          original: data,
          brands: Object.keys(data),
          models: Object.values(data).flat() as string[],
          loading: false,
          error: false,
        }),
      )
      .catch(() =>
        setBrandsAndModels({
          original: {},
          brands: [],
          models: [],
          loading: false,
          error: true,
        }),
      );

    return () => {
      controller.abort();
    };
  }, []);

  const filterBrands: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value },
    } = e;
    setBrandsAndModels((prevState) => {
      const keys = Object.keys(prevState.original).filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
      const result = {};
      for (const key of keys) {
        Object.assign(result, { [key]: prevState.original[key] });
      }

      return {
        ...prevState,
        brands: keys,
        models: Object.values(result).flat() as string[],
      };
    });
  };

  const filterModels: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value },
    } = e;
    setBrandsAndModels((prevState) => {
      const result = [];

      for (const brand of prevState.brands) {
        for (const model of prevState.original[brand]) {
          if (model.toLowerCase().includes(value.toLowerCase())) {
            result.push(model);
          }
        }
      }

      return { ...prevState, models: result };
    });
  };

  useEffect(() => {
    if (Object.keys(brandsAndModels.original).length) {
      const filteredBrands = searchParams.getAll("Makes");
      if (filteredBrands.length > 0) {
        const result: string[] = [];
        for (const brand of filteredBrands) {
          result.push(...brandsAndModels.original[brand]);
        }
        setBrandsAndModels((prevState) => ({
          ...prevState,
          models: result,
        }));
      }
    }
  }, [brandsAndModels.original, searchParams]);

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
    brandsAndModels,
    auctionName,
    auctionState,
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
