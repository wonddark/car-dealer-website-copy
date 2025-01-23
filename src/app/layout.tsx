"use client";

import "../styles/style.css";
import Wrapper from "@/layouts/Wrapper";
import React from "react";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import store from "@/store";
import { Provider } from "react-redux";

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
          <Provider store={store}>
            <Header />
            {children}
            <Footer />
          </Provider>
        </Wrapper>
      </body>
    </html>
  );
}
