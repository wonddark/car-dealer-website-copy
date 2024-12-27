import FiltersSidebar from "@/components/common/FiltersSidebar";
import Search from "@/components/home/Search";
import TopProducts from "@/components/home/TopProducts";
import React from "react";

export default function VehiclesInventory() {
  return (
    <div className="container-xl">
      <div className="row">
        <div className="d-none d-lg-block col-3 py-2">
          <FiltersSidebar />
        </div>
        <div className="col-12 col-lg-9 p-0 vstack g-2 gap-2">
          <Search />
          <TopProducts />
        </div>
      </div>
    </div>
  );
}
