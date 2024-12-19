"use client";

import Footer from "@/layouts/Footer";
import React from "react";
import HeaderThree from "@/layouts/HeaderThree";
import useCategoryProducts from "@/components/Category/use-category-products";
import InfiniteVehiclesList from "@/components/InfiniteVehiclesList";
import Search from "@/components/home/Search";

const Category = () => {
  const { category, getNextPage, requestStatus, response } =
    useCategoryProducts();
  return (
    <>
      <HeaderThree links="" title={category.title} />
      <div className="pt-3">
        <Search />
      </div>

      <div className="page-content-wrapper mt-3">
        <InfiniteVehiclesList
          response={response}
          requestStatus={requestStatus}
          getNextPage={getNextPage}
        />
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>

      <Footer />
    </>
  );
};

export default Category;
