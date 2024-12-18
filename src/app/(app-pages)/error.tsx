"use client";

import FixingBugs from "@/components/FixingBugs";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <div style={{ maxWidth: 200 }}>
          <FixingBugs />
        </div>
        <p className="display-6 fw-medium mt-4">!!Ups!! Encontramos un error</p>
        <p className="fs-5 text-center">
          Lamentamos esta situación, estamos trabajando para resolver este
          incidente lo más pronto posible. Mientras tanto continúa utilizando
          nuestro servicio
        </p>
        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
