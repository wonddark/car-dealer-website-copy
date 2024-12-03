import HeaderTwo from "@/layouts/HeaderTwo";
import { Vehicle } from "@/types/vehicle";

export default function VehicleDetails({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  return (
    <>
      <HeaderTwo links="" title={vehicle.titleCode} />

      <div className="page-content-wrapper py-3">
        <div className="container">
          <div className="card">
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </>
  );
}
