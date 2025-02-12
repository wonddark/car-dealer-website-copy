"use client";

import { Button } from "react-bootstrap";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";

export default function Highlighted() {
  return (
    <NavigationMenu.Item asChild className="navigation-menu-item">
      <Button
        variant="link"
        className="text-decoration-none text-nowrap text-start link-secondary"
      >
        Vehículos destacados
      </Button>
    </NavigationMenu.Item>
  );
}
