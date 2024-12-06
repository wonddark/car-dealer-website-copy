"use client";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import useTheme from "@/hooks/useTheme";

const OffCanvas = ({
  handleShow,
  show,
}: Readonly<{
  handleShow: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
}>) => {
  const { theme, toggleTheme } = useTheme();
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
            <h5 className="user-name mb-1 text-white">Suha Sarah</h5>
          </div>
        </div>

        <ul className="sidenav-nav ps-0">
          <li>
            <Link href="/login">
              <i className="ti ti-user"></i>Acceder
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <i className="ti ti-user"></i>Mi perfil
            </Link>
          </li>
          <li>
            <Link href="/notifications">
              <i className="ti ti-bell-ringing lni-tada-effect"></i>
              Notifications<span className="ms-1 badge badge-warning">3</span>
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
              Our company
            </a>
            <div className="collapse" id="companyLinks">
              <ul>
                <li>
                  <a href="/about-us">About us</a>
                </li>
                <li>
                  <a href="/contact">Contact us</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy policy</a>
                </li>
                <li>
                  <a href="/terms">Terms & conditions</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="suha-dropdown-menu">
            <Link href="/wishlist">
              <i className="ti ti-heart"></i>Mi lista de deseos
            </Link>
          </li>
          <li>
            <div className="form-check form-switch mb-0 ps-5">
              <label
                className="form-check-label text-white h6 mb-0"
                htmlFor="darkSwitch"
              >
                {`${theme.slice(0, 1).toUpperCase()}${theme.slice(1)} mode`}
              </label>

              <input
                className="form-check-input"
                id="darkSwitch"
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
            </div>
          </li>
          <li>
            <Link href="/settings">
              <i className="ti ti-adjustments-horizontal"></i>Settings
            </Link>
          </li>
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
