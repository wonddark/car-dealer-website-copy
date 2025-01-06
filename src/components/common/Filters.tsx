"use client";

import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch } from "@/redux/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resetData, toggleLoading } from "@/redux/features/vehicles.slice";
import OdometerFilter from "@/components/common/OdometerFilter";
import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import VehicleTypes from "@/components/filters/VehicleTypes";
import ReleaseYear from "@/components/filters/ReleaseYear";
import TitleTypes from "@/components/filters/TitleTypes";
import FuelType from "../filters/FuelType";
import PrimaryDamages from "@/components/filters/PrimaryDamages";
import AuctionNames from "../filters/AuctionNames";
import AuctionDate from "@/components/filters/AuctionDate";

export default function Filters() {
  const {
    brandsAndModels,
    bestOfferChecked,
    buyNowChecked,
    auctionState,
    handleCheckChange,
    filterBrands,
    filterModels,
    stateVal,
    brandChecked,
    modelChecked,
    applyFilters,
    handleBestOfferToggler,
  } = useFilters();
  return (
    <div className="offcanvas-body py-5 py-lg-3 px-0">
      <div className="vstack px-3 gap-2 mb-2">
        <div className="form-check form-switch">
          <label className="form-check-label" htmlFor="best-offer">
            Mejores ofertas
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="best-offer"
            name="IsBestOffer"
            checked={bestOfferChecked}
            onChange={handleBestOfferToggler}
          />
        </div>
        <div className="form-check form-switch">
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Comprar ahora
          </label>
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
        </div>
      </div>
      <div className="accordion mb-4" id="accordion-filters">
        <div className="accordion-item">
          <VehicleTypes />
        </div>
        <div className="accordion-item">
          <OdometerFilter />
        </div>
        <div className="accordion-item">
          <ReleaseYear />
        </div>
        <div className="accordion-item">
          <TitleTypes />
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-brand"
              aria-controls="collapse-brand"
            >
              <strong>Marca</strong>
            </button>
          </h2>
          <div
            id="collapse-brand"
            className="accordion-collapse collapse"
            data-bs-parent="#accordion-filters"
          >
            <div className="accordion-body">
              <div className="position-relative">
                <input
                  className="form-control border-secondary position-sticky top-0"
                  type="search"
                  onChange={filterBrands}
                  placeholder="Buscar marca..."
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
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-model"
              aria-controls="collapse-model"
            >
              <strong>Modelo</strong>
            </button>
          </h2>
          <div
            id="collapse-model"
            className="accordion-collapse collapse"
            data-bs-parent="#accordion-filters"
          >
            <div className="accordion-body">
              <div className="position-relative">
                <input
                  className="form-control border-secondary"
                  type="search"
                  onChange={filterModels}
                  placeholder="Buscar modelo"
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
        </div>
        <div className="accordion-item">
          <FuelType />
        </div>
        <div className="accordion-item">
          <AuctionNames />
        </div>
        <div className="accordion-item">
          <PrimaryDamages />
        </div>
        <div className="accordion-item">
          <AuctionDate />
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-auction-state"
              aria-controls="collapse-auction-state"
            >
              <strong>Estado</strong>
            </button>
          </h2>
          <div
            id="collapse-auction-state"
            className="accordion-collapse collapse"
            data-bs-parent="#accordion-filters"
          >
            <div className="accordion-body">
              <input
                type="text"
                className="form-control"
                placeholder="Estado"
                ref={auctionState}
                defaultValue={stateVal}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-lg btn-primary w-100"
        disabled={!auctionState.current?.value}
        onClick={applyFilters}
      >
        Aplicar
      </button>
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
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return null;
        } else {
          setBrandsAndModels({
            original: {},
            brands: [],
            models: [],
            loading: false,
            error: true,
          });
        }
      });

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
  const auctionState = useRef<HTMLInputElement>(null);

  const applyFilters = () => {
    dispatch(toggleLoading());
    dispatch(resetData());
    r.push(
      pathname +
        "?" +
        createQueryString({
          name: "State",
          value: auctionState.current?.value ?? "",
          add: true,
        }),
    );
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

  const buyNowChecked = Boolean(searchParams.get("InBuyNow"));
  const odometerMinVal = searchParams.get("OdometerFrom") ?? undefined;
  const odometerMaxVal = searchParams.get("OdometerTo") ?? undefined;
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
  const isBestOffer = searchParams.get("IsBestOffer") ?? "";
  const bestOfferChecked = isBestOffer ? isBestOffer === "true" : true;
  const handleBestOfferToggler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { checked, name },
    } = e;
    dispatch(toggleLoading());
    dispatch(resetData());
    if (checked) {
      r.push(
        pathname +
          "?" +
          createQueryString({
            name,
            value: "false",
            add: false,
          }),
      );
    } else {
      r.push(
        pathname +
          "?" +
          createQueryString({
            name,
            value: "false",
            add: true,
          }),
      );
    }
  };

  const orderBySelected = (val: string) => {
    const sortBy = searchParams.get("SortBy") ?? "";
    return val === sortBy;
  };

  const orderActive = (val: string) => {
    const order = searchParams.get("IsDescending") ?? "true";
    return val === order;
  };

  const changeSort = (val: string) => {
    dispatch(toggleLoading());
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams.toString());
    const currentSort = sp.get("IsDescending") ?? "";
    if (currentSort === val) {
      sp.delete("IsDescending");
    } else {
      sp.set("IsDescending", val);
    }
    r.push(pathname + "?" + sp);
  };

  const handleOptionChange: ChangeEventHandler<HTMLSelectElement> = ({
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
    auctionState,
    bestOfferChecked,
    buyNowChecked,
    odometerMinVal,
    odometerMaxVal,
    stateVal,
    brandChecked,
    modelChecked,
    vehicleTypeChecked,
    handleCheckChange,
    filterBrands,
    filterModels,
    applyFilters,
    orderBySelected,
    orderActive,
    changeSort,
    handleOptionChange,
    handleBestOfferToggler,
  };
};
