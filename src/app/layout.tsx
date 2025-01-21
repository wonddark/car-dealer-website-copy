"use client";

import "../styles/style.css";
import Wrapper from "@/layouts/Wrapper";
import React from "react";
import Footer from "@/layouts/Footer";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("bootstrap/dist/js/bootstrap.min");
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" theme-color="light" data-bs-theme="light">
      <head>
        <title>La Subasta Cubana</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/img/core-img/logo-small.png"
        />
      </head>
      <body>
        <Wrapper>
          {children}
          <Footer />
        </Wrapper>
      </body>
    </html>
  );
}
