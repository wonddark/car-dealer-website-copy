"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import React from "react";
import { usePathname } from "next/navigation";
import Populars from "@/components/common/Populars";
import Highlighted from "@/components/common/Highlighted";

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
        <NavigationMenu.Item className="position-relative">
          <NavigationMenu.Trigger asChild>
            <NavigationMenu.Link asChild>
              <Link
                href="/vehicles?IsBestOffer=true"
                className={`btn shit-class d-inline-flex align-items-center gap-1 text-decoration-none ${pathname.includes("/vehicles") ? "btn-primary rounded-bottom-0" : "btn-link"}`}
              >
                <i className="ti ti-car-garage"></i>
                <span>Vehículos</span>
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <Card className="shadow rounded-0">
              <NavigationMenu.Sub>
                <NavigationMenu.List className="m-0 p-0 d-flex flex-column align-items-stretch">
                  <NavigationMenu.Item asChild className="navigation-menu-item">
                    <Button
                      variant="link"
                      className="text-decoration-none text-start"
                    >
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/vehicles?IsBestOffer=true"
                          className="d-flex gap-3 align-items-center fw-normal text-nowrap link-secondary"
                        >
                          Todos los vehículos
                        </Link>
                      </NavigationMenu.Link>
                    </Button>
                  </NavigationMenu.Item>
                  <Highlighted />
                  <Populars />
                </NavigationMenu.List>
              </NavigationMenu.Sub>
            </Card>
          </NavigationMenu.Content>

          <NavigationMenu.Viewport
            className="position-absolute"
            style={{
              top: "calc(100% + 8px)",
              left: 0,
              width: "fit-content",
            }}
          />
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
    </NavigationMenu.Root>
  );
}
