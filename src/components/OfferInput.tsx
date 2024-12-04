"use client";

import { useState } from "react";
import { Vehicle } from "@/types/vehicle";

const OFFER_STEP = 50;

export default function OfferInput({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  const [myOffer, setMyOffer] = useState<number>(
    vehicle.currentOffer + OFFER_STEP,
  );
  return (
    <div className="hstack">
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => setMyOffer((prevState) => prevState - OFFER_STEP)}
        disabled={myOffer === vehicle.currentOffer + OFFER_STEP}
      >
        <i className="ti ti-minus"></i>
      </button>
      <input
        type="number"
        min={vehicle.currentOffer + OFFER_STEP}
        step={OFFER_STEP}
        value={myOffer}
        onChange={({ currentTarget: { value } }) => setMyOffer(Number(value))}
        className="form-control"
      />
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => setMyOffer((prevState) => prevState + OFFER_STEP)}
      >
        <i className="ti ti-plus"></i>
      </button>
    </div>
  );
}
