import FiltersSidebar from "@/components/common/FiltersSidebar";
import Search from "@/components/home/Search";
import VehiclesInventory from "@/components/home/VehiclesInventory";
import React from "react";

export default function VehiclesInventoryPage() {
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="d-none d-lg-block col-3 py-2">
          <FiltersSidebar />
        </div>
        <div className="col-12 col-lg-9 p-0">
          <div className="row">
            <div className="col-12">
              <div className="container-xxl py-2">
                <div className="vstack g-3 gap-2">
                  <section>
                    <Search />
                  </section>
                  <section>
                    <VehiclesInventory />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
