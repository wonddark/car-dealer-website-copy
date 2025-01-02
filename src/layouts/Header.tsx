"use client";
import OffCanvas from "@/components/common/OffCanvas";
import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const sp = useSearchParams();
  const query = sp.get("SearchInput") ?? "";

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container-xxl">
          <div className="vstack gap-1">
            <div className="hstack justify-content-between">
              <div className="logo-wrapper">
                <Link href="/">
                  <img
                    src="/assets/img/core-img/logo-round.png"
                    alt=""
                    className="h-100 mh-100 w-auto"
                  />
                </Link>
              </div>
              <form
                action="/vehicles"
                className="d-none d-lg-block flex-fill mx-lg-5"
                style={{ marginTop: 8 }}
              >
                <input
                  type="text"
                  hidden
                  name="IsBestOffer"
                  value="false"
                  readOnly
                />
                <input
                  type="search"
                  className="form-control form-control-sm border-secondary"
                  placeholder="VIN, marca, modelo o número de lote separados por comas"
                  name="SearchInput"
                  defaultValue={query}
                />
                <input type="submit" hidden />
              </form>
              <div className="d-flex align-items-center">
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
            <form action="/vehicles" className="d-lg-none">
              <input
                type="text"
                hidden
                name="IsBestOffer"
                value="false"
                readOnly
              />
              <input
                type="search"
                className="form-control border-secondary"
                placeholder="VIN, marca, modelo o número de lote"
                name="SearchInput"
                defaultValue={query}
              />
              <input type="submit" hidden />
            </form>
          </div>
        </div>
      </div>
      <OffCanvas handleShow={handleShow} show={show} />
    </>
  );
};

export default Header;
