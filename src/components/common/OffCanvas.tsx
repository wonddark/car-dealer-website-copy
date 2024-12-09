"use client";

import Link from "next/link";
import React, { MouseEventHandler } from "react";

const OffCanvas = ({
  handleShow,
  show,
}: Readonly<{
  handleShow: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
}>) => {
  return (
    <div
      className={`offcanvas offcanvas-start suha-offcanvas-wrap ${
        show ? "show" : ""
      }`}
      tabIndex={-1}
      id="suhaOffcanvas"
      aria-labelledby="suhaOffcanvasLabel"
    >
      <button
        onClick={handleShow}
        className="btn-close btn-close-white"
        type="button"
      ></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile">
            <img src="/assets/img/bg-img/9.jpg" alt="" />
          </div>
          <div className="user-info">
            <h5 className="user-name mb-1 text-white">Jane Doe</h5>
          </div>
        </div>

        <ul className="sidenav-nav ps-0">
          <li>
            <Link href="/login">
              <i className="ti ti-user"></i>Acceder
            </Link>
          </li>
          <li>
            <Link href="/register">
              <i className="ti ti-user"></i>Crear cuenta
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <i className="ti ti-user"></i>Mi perfil
            </Link>
          </li>
          <li>
            <a
              data-bs-toggle="collapse"
              href="#companyLinks"
              role="button"
              aria-expanded="false"
              aria-controls="companyLinks"
            >
              <i className="ti ti-building" />
              Nuestra empresa
            </a>
            <div className="collapse" id="companyLinks">
              <ul>
                <li>
                  <Link href="/about-us">Sobre nosotros</Link>
                </li>
                <li>
                  <Link href="/contact">Contactános</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacidad</Link>
                </li>
                <li>
                  <Link href="/terms">Términos</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="suha-dropdown-menu">
            <Link href="/wishlist">
              <i className="ti ti-heart"></i>Mi lista de deseos
            </Link>
          </li>
          {/*<li>
            <Link href="/settings">
              <i className="ti ti-adjustments-horizontal"></i>Preferencias
            </Link>
          </li>*/}
          <li>
            <Link href="/">
              <i className="ti ti-logout"></i>Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OffCanvas;
