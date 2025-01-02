import HeaderTwo from "@/layouts/HeaderTwo";
import OfferInput from "@/components/OfferInput";
import { Vehicle } from "@/types/vehicle";
import * as motion from "motion/react-client";
import { renderCurrentOffer } from "@/utils/vehicle-data";

export default function VehicleDetails({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "200vw", shadow: "-1px 0 0 7px #333" }}
      animate={{ opacity: 1, x: 0, shadow: "0px 0 0 0 #333" }}
      exit={{ opacity: 0, x: "200vw", shadow: "-1px 0 0 7px #333" }}
      transition={{ type: "keyframes" }}
    >
      <HeaderTwo
        links=""
        title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      />
      <div className="page-content-wrapper py-3 mt-0">
        <div className="container-xxl">
          <div className="row row-gap-md-4 align-items-stretch justconten">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.vin}
              className="col-12 col-md-9 rounded-2"
            />
            <div className="col-12 col-md-3">
              <div
                className="bg-secondary bg-opacity-10 rounded-2 h-100"
                style={{ minHeight: 70 }}
              ></div>
            </div>
            <div className="col-12 col-md-7">
              <div className="card">
                <div className="card-body">
                  <div className="vstack gap-4">
                    <div className="vstack gap-2">
                      <div className="hstack">
                        <strong className="text-muted">Número de lote</strong>
                        <span className="ms-auto text-end">
                          {vehicle.lotNumber}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">VIN</strong>
                        <span className="ms-auto text-end">{vehicle.vin}</span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Código de Título</strong>
                        <span className="ms-auto text-end">
                          {vehicle.titleCode}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Odómetro</strong>
                        <span className="ms-auto text-end">
                          {vehicle.odometer}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Color</strong>
                        <span className="ms-auto text-end">
                          {vehicle.color}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Daños Primarios</strong>
                        <span className="ms-auto text-end">
                          {vehicle.primaryDamage}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">
                          Daños Secundarios
                        </strong>
                        <span className="ms-auto text-end">
                          {vehicle.secondaryDamage}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">
                          Costo Estimado de Reparación
                        </strong>
                        <span className="ms-auto text-end">
                          {vehicle.estimatedRepairCost}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Valor Estimado</strong>
                        <span className="ms-auto text-end">
                          {vehicle.estimatedValue}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Motor</strong>
                        <span className="ms-auto text-end">
                          {vehicle.engine}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Transmisión</strong>
                        <span className="ms-auto text-end">
                          {vehicle.transmission}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">
                          Tipo de conducción
                        </strong>
                        <span className="ms-auto text-end">
                          {vehicle.driveType}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Tipo de vehículo</strong>
                        <span className="ms-auto text-end">
                          {vehicle.vehicleType}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Combustible</strong>
                        <span className="ms-auto text-end">
                          {vehicle.fuelType}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Llaves</strong>
                        <span className="ms-auto text-end">
                          {vehicle.hasKeys}
                        </span>
                      </div>
                      <div className="hstack">
                        <strong className="text-muted">Detalles</strong>
                        <span className="ms-auto text-end">
                          {vehicle.details}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted small mt-4">
                      Según la subasta, al momento del inventario, el vehículo
                      funcionaba y andaba “Run & Drive”, lo que significa que el
                      vehículo: 1) arrancó solo o con el uso de un puente
                      externo, 2) se puso en marcha y 3) avanzó. Esta
                      designación no es ninguna confirmación, declaración o
                      garantía de que el vehículo pueda arrancar, ponerse en
                      marcha o avanzar al momento de la venta. Esta designación
                      no es ninguna confirmación, declaración o garantía de que
                      el vehículo pueda arrancar, ponerse en marcha o avanzar al
                      momento de la venta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="card">
                <div className="card-body">
                  <div className="vstack gap-2">
                    <div className="hstack">
                      <strong>Información de la oferta</strong>
                      <span className="text-end ms-auto">
                        {vehicle.saleAuctionDate}
                      </span>
                    </div>
                    <div className="hstack">
                      <strong className="text-muted">
                        Estado de la oferta
                      </strong>
                      <span className="text-end ms-auto">
                        {vehicle.offerStatus}
                      </span>
                    </div>
                    <div className="hstack">
                      <strong className="text-muted">Estado de Venta</strong>
                      <span className="text-end ms-auto">
                        {vehicle.saleStatus}
                      </span>
                    </div>
                    <div className="hstack">
                      <strong className="text-muted">Oferta actual</strong>
                      <span className="text-end ms-auto">
                        {renderCurrentOffer(vehicle.currentOffer)}
                      </span>
                    </div>
                    <div className="hstack">
                      <strong className="text-muted">Compra inmediata</strong>
                      <span className="text-end ms-auto">
                        {vehicle.buyNowPrice
                          ? `$${vehicle.buyNowPrice}`
                          : "No disponible"}
                      </span>
                    </div>
                    <div className="mt-4">
                      <strong className="small">Su oferta máxima:</strong>
                      <OfferInput vehicle={vehicle} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
