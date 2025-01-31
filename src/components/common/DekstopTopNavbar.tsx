"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import React from "react";
import { usePathname } from "next/navigation";
import Populars from "@/components/common/Populars";

export default function DesktopTopNavbar() {
  const pathname = usePathname();
  return (
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
        <NavigationMenu.Item>
          <NavigationMenu.Trigger asChild>
            <NavigationMenu.Link asChild>
              <Button
                variant={pathname.includes("/vehicles") ? "primary" : "link"}
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
                maxWidth: "75vw",
                left: 0,
              }}
            >
              <CardBody>
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ab accusamus accusantium aliquid aperiam aut
                        deserunt dolor dolorem, ipsa nisi nobis pariatur, porro
                        quas qui recusandae reprehenderit repudiandae sit soluta
                        voluptate?
                      </span>
                    </Col>
                  </Row>
                </NavigationMenu.Link>
                <hr className="my-3" />
                <Populars />
              </CardBody>
            </Card>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              href="/como-comprar"
              className={`btn fw-normal text-decoration-none ${pathname === "/como-comprar" ? "btn-primary pe-none rounded-bottom-0" : "btn-link"}`}
            >
              ¿Cómo comprar?
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              href="/estimar-precio"
              className="btn fw-normal btn-link text-decoration-none d-inline-flex align-items-center gap-2"
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
  );
}
