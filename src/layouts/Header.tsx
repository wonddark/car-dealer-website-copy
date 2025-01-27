"use client";

import OffCanvas from "@/components/common/OffCanvas";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { Button, Card, CardBody, Col, Collapse, Row } from "react-bootstrap";
import FiltersBanner from "@/components/FiltersBanner";
import useVehiclesInventory from "@/hooks/useVehiclesInventory";
import { useFilters } from "@/components/common/Filters";
import OrderBySelector from "@/components/OrderBySelector";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SearchInput } from "@/components/SearchInput";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SidePortal from "@/layouts/SidePortal";

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
  const pathname = usePathname();
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
              <NavigationMenu.Root>
                <NavigationMenu.List className="d-flex p-0">
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link
                        href="/"
                        className={`btn text-decoration-none ${pathname === "/" ? "btn-primary pe-none rounded-bottom-0" : "btn-link"}`}
                      >
                        <i className="ti ti-home"></i>
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item className="position-relative">
                    <NavigationMenu.Trigger asChild>
                      <NavigationMenu.Link asChild>
                        <Button
                          variant={
                            pathname.includes("/vehicles") ? "primary" : "link"
                          }
                          className={`d-inline-flex align-items-center gap-1 text-decoration-none${pathname.includes("/vehicles") ? " rounded-bottom-0" : ""}`}
                        >
                          <i className="ti ti-car-garage"></i>
                          <span>Vehículos</span>
                        </Button>
                      </NavigationMenu.Link>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="position-absolute">
                      <Card
                        style={{
                          maxWidth: "45vw",
                        }}
                      >
                        <CardBody>
                          <Row>
                            <Col xs={5}>
                              <Image
                                src="/assets/img/car1.jpg"
                                alt=""
                                width={400}
                                height={400}
                                className="h-100 object-fit-cover"
                              />
                            </Col>
                            <Col xs={7}>
                              <NavigationMenu.Link asChild>
                                <Row>
                                  <Col xs={12}>
                                    <Link
                                      href="/vehicles?IsBestOffer=true"
                                      className="btn btn-link text-decoration-none px-0"
                                    >
                                      Inventario
                                    </Link>
                                  </Col>
                                  <Col xs={12}>
                                    <span>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Ab accusamus accusantium
                                      aliquid aperiam aut deserunt dolor
                                      dolorem, ipsa nisi nobis pariatur, porro
                                      quas qui recusandae reprehenderit
                                      repudiandae sit soluta voluptate?
                                    </span>
                                  </Col>
                                </Row>
                              </NavigationMenu.Link>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link
                        href="/como-comprar"
                        className={`btn text-decoration-none ${pathname === "/como-comprar" ? "btn-primary pe-none rounded-bottom-0" : "btn-link"}`}
                      >
                        ¿Cómo comprar?
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link
                        href="/estimar-precio"
                        className="btn btn-link text-decoration-none d-inline-flex align-items-center gap-2"
                      >
                        <i className="ti ti-calculator-filled"></i>
                        <span>Calculador de precios</span>
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                      <Link
                        href="/support/faq"
                        className="btn btn-link text-decoration-none"
                      >
                        Soporte
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
                <NavigationMenu.Viewport />
              </NavigationMenu.Root>
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
