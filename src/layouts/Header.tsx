"use client";
import OffCanvas from "@/components/common/OffCanvas";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container-xxl h-100 d-flex align-items-center justify-content-between d-flex rtl-flex-d-row-r">
          <div className="logo-wrapper">
            <Link href="/">
              <img
                src="/assets/img/core-img/logo-round.png"
                alt=""
                className="h-100 mh-100 w-auto"
              />
            </Link>
          </div>
          <div className="navbar-logo-container d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn rounded-circle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/assets/img/bg-img/9.jpg"
                  alt=""
                  className="user-profile-icon rounded-circle"
                />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/profile" className="dropdown-item">
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/login">
                    Acceder
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/register">
                    Registro
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="suha-navbar-toggler ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#suhaOffcanvas"
              aria-controls="suhaOffcanvas"
            >
              <button className="btn" onClick={() => handleShow()}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <OffCanvas handleShow={handleShow} show={show} />
    </>
  );
};

export default Header;
