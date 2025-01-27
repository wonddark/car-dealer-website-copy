import InfiniteScroll from "react-infinite-scroll-component";
import VehicleCard from "@/components/VehicleCard";
import React from "react";
import { VehicleResponse } from "@/types/vehicle";
import NoData from "@/components/NoData";
import VehiclesLoading from "@/components/VehiclesLoading";

type Props = {
  response: VehicleResponse;
  requestStatus: { loading: boolean; error: boolean };
  getNextPage: () => void;
};

export default function InfiniteVehiclesList(props: Readonly<Props>) {
  const { response, requestStatus, getNextPage } = props;
  return (
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
        <div key={item.vin} className="col-12 col-md-6 col-xl-4">
          <VehicleCard vehicle={item} />
        </div>
      ))}
      {requestStatus.loading && (
        <>
          {[0, 1, 3, 4, 5, 6].map((item) => (
            <div key={item} className="col-12 col-md-6 col-xl-4">
              <VehiclesLoading />
            </div>
          ))}
        </>
      )}
    </InfiniteScroll>
  );
}

const EndMessage = ({
  length,
  loading,
}: Readonly<{
  length: number;
  loading: boolean;
}>) => <>{!loading ? length === 0 && <EmptyResult /> : null}</>;

const EmptyResult = () => {
  return (
    <div className="card">
      <div className="card-body d-flex flex-column align-items-center py-5">
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
    </div>
  );
};
