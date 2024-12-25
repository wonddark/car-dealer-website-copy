"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";
import Header from "@/layouts/Header";
import React from "react";
import Footer from "@/layouts/Footer";

export default function AppPagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <Header />
      <div className="page-content-wrapper">{children}</div>
      <Footer />
    </Provider>
  );
}
