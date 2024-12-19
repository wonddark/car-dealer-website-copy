import React from "react";
import TopProducts from "./home/TopProducts";
import ProductCategories from "./home/ProductCategories";
import * as motion from "motion/react-client";
import Search from "@/components/home/Search";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "keyframes" }}
    >
      <ProductCategories />
      <Search />
      <TopProducts />2
    </motion.div>
  );
};

export default Home;
