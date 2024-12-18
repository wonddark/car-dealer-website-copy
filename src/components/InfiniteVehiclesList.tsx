import InfiniteScroll from "react-infinite-scroll-component";
import VehicleCard from "@/components/VehicleCard";
import React from "react";
import { VehicleResponse } from "@/types/vehicle";
import NoData from "@/components/NoData";

type Props = {
  response: VehicleResponse;
  requestStatus: { loading: boolean; error: boolean };
  getNextPage: () => void;
};

export default function InfiniteVehiclesList(props: Readonly<Props>) {
  const { response, requestStatus, getNextPage } = props;
  return (
    <div className="container-xl">
      <InfiniteScroll
        dataLength={response.data.length}
        next={getNextPage}
        hasMore={Boolean(response.next)}
        loader={null}
        endMessage={
          <EndMessage
            length={response.data.length}
            loading={requestStatus.loading}
          />
        }
        refreshFunction={getNextPage}
        pullDownToRefresh={false}
        className="row g-2"
      >
        {response.data.map((item) => (
          <VehicleCard vehicle={item} key={item.vin} />
        ))}
        <VehiclesLoading loading={requestStatus.loading} />
      </InfiniteScroll>
    </div>
  );
}

const VehiclesLoading = ({ loading }: { loading: boolean }) => (
  <>
    {loading && (
      <>
        {[0, 1, 3, 4, 5, 6].map((item) => (
          <div key={item} className="col-12 col-md-6 col-xl-4">
            <div className="card" aria-hidden="true">
              <div className="card-body">
                <div className="placeholder-glow mb-2">
                  <div className="ratio ratio-4x3 placeholder rounded-2"></div>
                </div>
                <h6 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h6>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    )}
  </>
);

const EndMessage = ({
  length,
  loading,
}: Readonly<{
  length: number;
  loading: boolean;
}>) => (
  <>
    {!loading && length === 0 && <EmptyResult />}
    {!loading && length > 0 && <p>No hay más vehículos para mostrar.</p>}
  </>
);

const EmptyResult = () => {
  return (
    <div className="d-flex flex-column align-items-center mx-auto">
      <div style={{ maxWidth: 200 }} className="mb-4">
        <NoData />
      </div>
      <p className="text-center display-6 fw-medium">
        No tenemos vehículos para mostrar
      </p>
      <p className="text-center fs-5">
        Te sugerimos que modifiques el criterio de búsqueda.
      </p>
    </div>
  );
};
