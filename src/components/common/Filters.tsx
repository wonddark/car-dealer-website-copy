"use client";

import React, { ChangeEventHandler, useCallback, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resetData } from "@/store/features/vehicles.slice";
import OdometerFilter from "@/components/common/OdometerFilter";
import VehicleTypes from "@/components/filters/VehicleTypes";
import ReleaseYear from "@/components/filters/ReleaseYear";
import TitleTypes from "@/components/filters/TitleTypes";
import FuelType from "../filters/FuelType";
import PrimaryDamages from "@/components/filters/PrimaryDamages";
import DealersNames from "../filters/DealersNames";
import AuctionDate from "@/components/filters/AuctionDate";
import SecondaryDamages from "@/components/filters/SecondaryDamages";
import BestOffers from "@/components/filters/BestOffers";
import BuyNow from "@/components/filters/BuyNow";
import Makers from "@/components/filters/Makers";
import Models from "@/components/filters/Modells";
import TransmissionTypes from "@/components/filters/TransmissionTypes";
import EngineTypes from "@/components/filters/EngineTypes";

export default function Filters() {
  const { auctionState, stateVal, applyFilters } = useFilters();
  return (
    <div className="offcanvas-body py-5 py-lg-3 px-0">
      <div className="vstack px-3 gap-2 mb-2">
        <BestOffers />
        <BuyNow />
      </div>
      <div className="accordion mb-4" id="accordion-filters">
        <VehicleTypes />
        <OdometerFilter />
        <ReleaseYear />
        <TitleTypes />
        <Makers />
        <Models />
        <PrimaryDamages />
        <SecondaryDamages />
        <FuelType />
        <DealersNames />
        <TransmissionTypes />
        <EngineTypes />
        <div className="accordion-item">
          <AuctionDate />
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
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

  const orderBy = searchParams.get("SortBy") ?? "";

  const orderActive = (val: string) => {
    const order = searchParams.get("IsDescending") ?? "true";
    return val === order;
  };

  const changeSort = (val: string) => {
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
    auctionState,
    bestOfferChecked,
    buyNowChecked,
    odometerMinVal,
    odometerMaxVal,
    stateVal,
    vehicleTypeChecked,
    handleCheckChange,
    applyFilters,
    orderBy,
    orderActive,
    changeSort,
    handleOptionChange,
    handleBestOfferToggler,
  };
};
