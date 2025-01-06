"use client";

import { useState } from "react";
import { Vehicle } from "@/types/vehicle";
import Link from "next/link";

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
          está y como está&#34;.
          <button
            className="btn btn-link d-inline btn-sm"
            onClick={() => console.log(myOffer)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Obtener más información
          </button>
        </p>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Condiciones de Oferta y Compra en La Subasta Cubana
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-start">
                <p>
                  Cuando realiza una oferta a través de La subasta cubana,
                  ofrece pagar la subasta por el vehículo especificado al precio
                  que especifique. Su precio de compra final incluirá las
                  tarifas de subasta, las tarifas de La subasta cubana y otras
                  tarifas que se detallan en los Términos y condiciones. El
                  vendedor puede aceptar la oferta más alta realizada durante la
                  subasta o contraofertas posteriores y, por lo tanto, si usted
                  es el postor más alto y se acepta su oferta o contraoferta,
                  estará obligado contractualmente a comprar el vehículo al
                  precio que especifique más las tarifas de subasta aplicables,
                  las tarifas de La subasta cubana y otras tarifas que se
                  detallan en los Términos y condiciones. Todas las ofertas y
                  ventas son definitivas. No existe derecho de rescisión ni
                  derechos de reembolso o cambio.
                </p>
                <p>
                  Dado que este vehículo se vende &#34;COMO ESTÁ - DONDE
                  ESTÁ&#34;, significa que el comprador lo compra &#34;con todos
                  los defectos&#34; y sin ninguna &#34;garantía&#34; de ningún
                  tipo, expresa o implícita. Cualquier información sobre este
                  vehículo proporcionada por el vendedor o Copart es solo para
                  conveniencia. Es su exclusiva responsabilidad verificar,
                  confirmar, investigar, inspeccionar e investigar un vehículo y
                  cualquier información relacionada con dicho vehículo antes de
                  ofertar por él. La subasta cubana niega expresamente la
                  exactitud de la información del vehículo en esta página,
                  incluidos los detalles de daños, las lecturas del odómetro y
                  los números de identificación del vehículo (VIN).
                </p>
                <p>
                  Para obtener más información, consulte los{" "}
                  <Link href="/terms">Términos y Condiciones</Link> de Miembros.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
