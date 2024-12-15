import HeaderTwo from "@/layouts/HeaderTwo";
import OfferInput from "@/components/OfferInput";
import { Vehicle } from "@/types/vehicle";

export default function VehicleDetails({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  return (
    <>
      <HeaderTwo
        links=""
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      />
      <div className="page-content-wrapper py-3 mt-0">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <img src={vehicle.imageUrl} alt={vehicle.vin} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Detalles del Vehículo</h6>
              <div className="vstack gap-2">
                <div className="hstack">
                  <strong className="text-muted">Número de lote</strong>
                  <span className="ms-auto">{vehicle.lotNumber}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">VIN</strong>
                  <span className="ms-auto">{vehicle.vin}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Código de Título</strong>
                  <span className="ms-auto">{vehicle.titleCode}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Odómetro</strong>
                  <span className="ms-auto">{vehicle.odometer}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Color</strong>
                  <span className="ms-auto">{vehicle.color}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Daños Primarios</strong>
                  <span className="ms-auto">{vehicle.primaryDamage}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Daños Secundarios</strong>
                  <span className="ms-auto">{vehicle.secondaryDamage}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">
                    Costo Estimado de Reparación
                  </strong>
                  <span className="ms-auto">{vehicle.estimatedRepairCost}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Valor Estimado</strong>
                  <span className="ms-auto">{vehicle.estimatedValue}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Motor</strong>
                  <span className="ms-auto">{vehicle.engine}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Transmisión</strong>
                  <span className="ms-auto">{vehicle.transmission}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Tipo de conducción</strong>
                  <span className="ms-auto">{vehicle.driveType}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Tipo de vehículo</strong>
                  <span className="ms-auto">{vehicle.vehicleType}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Combustible</strong>
                  <span className="ms-auto">{vehicle.fuelType}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Llaves</strong>
                  <span className="ms-auto">{vehicle.hasKeys}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Detalles</strong>
                  <span className="ms-auto">{vehicle.details}</span>
                </div>
              </div>
              <p className="text-muted small mt-4">
                Según la subasta, al momento del inventario, el vehículo
                funcionaba y andaba “Run & Drive”, lo que significa que el
                vehículo: 1) arrancó solo o con el uso de un puente externo, 2)
                se puso en marcha y 3) avanzó. Esta designación no es ninguna
                confirmación, declaración o garantía de que el vehículo pueda
                arrancar, ponerse en marcha o avanzar al momento de la venta.
                Esta designación no es ninguna confirmación, declaración o
                garantía de que el vehículo pueda arrancar, ponerse en marcha o
                avanzar al momento de la venta.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="vstack gap-2">
                <div className="hstack">
                  <strong>Información de la oferta</strong>
                  <span className="text-end ms-auto">{vehicle.saleDate}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Estado de la oferta</strong>
                  <span className="text-end ms-auto">
                    {vehicle.offerStatus}
                  </span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Estado de Venta</strong>
                  <span className="text-end ms-auto">{vehicle.saleStatus}</span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Oferta actual</strong>
                  <span className="text-end ms-auto">
                    {vehicle.currentOffer}
                  </span>
                </div>
                <div className="hstack">
                  <strong className="text-muted">Compra inmediata</strong>
                  <span className="text-end ms-auto">
                    {vehicle.buyNowPrice}
                  </span>
                </div>
                <div>
                  <strong className="small">Su oferta máxima:</strong>
                  <OfferInput vehicle={vehicle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
