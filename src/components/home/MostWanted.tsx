import React from "react";
import Link from "next/link";
import { VehicleResponse } from "@/types/vehicle";
import "swiper/css";
import BuyNowCarrusel from "@/components/BuyNowCarrusel";

export default async function MostWanted() {
  try {
    const res = await fetch(
      process.env.API_ENDPOINT +
        "/auction-inventories/search?PageNumber=1&PageSize=12&IsBestOffer=true",
    );
    if (res.status === 200) {
      const data = (await res.json()) as VehicleResponse;
      return (
        <section className="pt-2">
          <h5 className="ps-1">Más buscados</h5>
          <BuyNowCarrusel data={data} />
          <div className="hstack justify-content-end mt-1">
            <Link href="/vehicles?IsBestOffer=true" className="btn btn-light">
              <span>Ver listado completo </span>
              <i className="ti ti-chevron-right"></i>
            </Link>
          </div>
        </section>
      );
    }
    return <p>Ocurrió un error, por favor vuelve a intentarlo.</p>;
  } catch (e) {
    return <p>Ocurrió un error, por favor vuelve a intentarlo.</p>;
  }
}
