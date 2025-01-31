"use client";

import OffCanvas from "@/components/common/OffCanvas";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import FiltersBanner from "@/components/FiltersBanner";
import useVehiclesInventory from "@/hooks/useVehiclesInventory";
import { useFilters } from "@/components/common/Filters";
import OrderBySelector from "@/components/OrderBySelector";
import { SearchInput } from "@/components/SearchInput";
import SidePortal from "@/layouts/SidePortal";
import DesktopTopNavbar from "@/components/common/DekstopTopNavbar";

const FilterOptions = () => {
  const { response, loading } = useVehiclesInventory();
  const { orderActive, changeSort } = useFilters();
  return (
    <>
      {!loading && response.totalCount > 0 && (
        <div className="hstack justify-content-between gap-1">
          <p className="m-0">
            <strong className="text-primary-emphasis">
              {response.totalCount}
            </strong>
            <span className="ms-1">resultados</span>
          </p>
          <div className="hstack gap-4">
            <OrderBySelector />
            <div className="hstack">
              <button
                type="button"
                className={`btn btn-light${orderActive("false") ? " active" : ""}`}
                data-bs-toggle="button"
                aria-pressed={orderActive("false")}
                onClick={() => changeSort("false")}
              >
                <i className="ti ti-sort-ascending"></i>
              </button>
              <button
                type="button"
                className={`btn btn-light${orderActive("true") ? " active" : ""}`}
                data-bs-toggle="button"
                aria-pressed={orderActive("true")}
                onClick={() => changeSort("true")}
              >
                <i className="ti ti-sort-descending"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Header = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow((prevState) => !prevState);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prevState) => !prevState);
  const [isOpen, setIsOpen] = useState(false);
  const closePortal = (val: boolean) => setIsOpen(val);

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
                <Suspense fallback="Loading">
                  <SearchInput />
                </Suspense>
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
            <form action="/vehicles" className="d-lg-none hstack gap-1">
              <input
                type="text"
                hidden
                name="IsBestOffer"
                value="false"
                readOnly
              />

              <Suspense fallback="Loading">
                <SearchInput />
              </Suspense>
              <input type="submit" hidden />
              <Button variant="outline-secondary" onClick={toggleOpen}>
                <i className="ti ti-adjustments"></i>
              </Button>
            </form>
            <div className="d-none d-lg-block">
              <DesktopTopNavbar />
            </div>
            <Collapse in={open} appear>
              <div className="pb-2">
                <div className="vstack gap-2">
                  <div className="hstack gap-2">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="btn btn-outline-primary d-lg-none d-flex align-items-center gap-2"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#suhaFilterOffcanvas"
                      aria-controls="suhaFilterOffcanvas"
                    >
                      <span>Filtros</span>
                      <i className="ti ti-filter"></i>
                    </button>
                    <Suspense fallback="Loading">
                      <FiltersBanner />
                    </Suspense>
                  </div>
                  <Suspense fallback="Loading">
                    <FilterOptions />
                  </Suspense>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <OffCanvas handleShow={handleShow} show={show} />
      {isOpen ? <SidePortal isOpen={isOpen} toggleOpen={closePortal} /> : null}
    </>
  );
};

export default Header;
