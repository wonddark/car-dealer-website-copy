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
    <div>
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
          className="form-control text-center"
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => setMyOffer((prevState) => prevState + OFFER_STEP)}
        >
          <i className="ti ti-plus"></i>
        </button>
      </div>
      <div className="d-grid gap-1 mt-2">
        <button type="button" className="btn btn-primary btn-lg">
          Publicar mi oferta
        </button>
        <p className="text-center small text-muted">
          Todas las ofertas son legalmente vinculantes y se venden &#34;donde
          esta y como esta&#34;.
          <button
            className="btn btn-link d-inline btn-sm"
            onClick={() => console.log(myOffer)}
          >
            Obtener más información
          </button>
        </p>
      </div>
    </div>
  );
}
