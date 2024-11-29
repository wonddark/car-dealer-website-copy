import React from "react";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Alert from "./common/Alert";
import Search from "./home/Search";
import TopProducts from "./home/TopProducts";
import ProductCategories from "./home/ProductCategories";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <>
      <Header />
      <Alert />
      <div className="page-content-wrapper">
        <Search />
        <ProductCategories />
        <TopProducts />
      </div>
      <Footer />
      <ToastContainer position="top-right" />
    </>
  );
};

export default Home;
