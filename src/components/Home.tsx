import React from "react";
import TopProducts from "./home/TopProducts";
import ProductCategories from "./home/ProductCategories";
import * as motion from "motion/react-client";
import Search from "@/components/home/Search";
import FiltersSidebar from "@/components/common/FiltersSidebar";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "keyframes" }}
    >
      <div className="container-xl">
        <div className="row">
          <div className="d-none d-lg-block col-3 top-0 bottom-0 position-sticky">
            <FiltersSidebar />
          </div>
          <div className="col-12 col-lg-9">
            <ProductCategories />
            <Search />
            <TopProducts />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
