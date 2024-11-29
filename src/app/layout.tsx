"use client";

import "../styles/style.css";
import "../styles/style.scss";
import store from "@/redux/store";
import { Provider } from "react-redux";
import Wrapper from "@/layouts/Wrapper";
import Header from "@/layouts/Header";
import Search from "@/components/home/Search";
import React from "react";
import Footer from "@/layouts/Footer";
import { ToastContainer } from "react-toastify";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("bootstrap/dist/js/bootstrap.min");
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" theme-color="light">
      <head>
        <title>La Subasta Cubana</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <Wrapper>
            <Header />
            <div className="page-content-wrapper">
              <Search />
              {children}
            </div>
            <Footer />
            <ToastContainer position="top-right" />
          </Wrapper>
        </Provider>
      </body>
    </html>
  );
}
