"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Vehicle } from "@/types/vehicle";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

export default function VehicleCard({
  vehicle,
}: Readonly<{ vehicle: Vehicle }>) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const sp = useSearchParams();
  const [imgUrl, setImgUrl] = useState(vehicle.imageUrl);
  const handleError = () => {
    setImgUrl("/assets/img/core-img/sedan.png");
    setFullyLoaded(true);
  };
  return (
    <div className="card product-card h-100">
      <div className="card-body p-2 p-md-3 h-100">
        <button className="wishlist-btn">
          <i className="ti ti-heart"></i>
        </button>
        <div className="d-flex flex-column h-100">
          <Link
            className={`product-thumbnail ${fullyLoaded ? "d-block" : "d-none"}`}
            href={`/vehicles/${vehicle.vin}?${sp.toString()}`}
            target="_blank"
          >
            <img
              className="mb-2 rounded-2 object-fit-cover ratio ratio-4x3"
              style={{ aspectRatio: "4/3" }}
              src={imgUrl}
              alt={vehicle.titleCode}
              onLoad={() => setFullyLoaded(true)}
              onError={handleError}
            />
          </Link>
          {!fullyLoaded ? (
            <div className="ratio ratio-4x3 w-100 placeholder-glow mb-2">
              <div className="h-100 w-100 placeholder rounded-2"></div>
            </div>
          ) : null}

          <Link
            className="product-title"
            href={`/vehicles/${vehicle.vin}?${sp.toString()}`}
            target="_blank"
          >
            {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          </Link>

          <div className="flex-fill">
            <AnimatePresence initial={false} mode="popLayout">
              {!expanded && (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, y: "-50%" }}
                  exit={{ opacity: 0, y: "50%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    type: "tween",
                    bounce: 0,
                    ease: "easeInOut",
                  }}
                >
                  <div className="d-flex flex-column align-items-start">
                    <ul className="p-0">
                      <li className="list-inline-item me-2">
                        <span className="flaticon-road-perspective me-1" />
                        <span className="me-1">
                          {Number(vehicle.odometer).toLocaleString("en-US")}
                        </span>
                        <span>mi</span>
                      </li>
                      <li className="list-inline-item me-2">
                        <span className="flaticon-gas-station me-1" />
                        {vehicle.fuelType ?? "N/A"}
                      </li>
                      <li className="list-inline-item">
                        <span className="flaticon-gear me-1" />
                        {renderTransmissionType(vehicle.transmission)}
                      </li>
                    </ul>
                    {vehicle.runAndDrive ? (
                      <div className="d-inline-flex mt-2 align-items-center gap-1">
                        <i className="ti ti-circle-check-filled text-success"></i>
                        <small className="text-opacity-75">
                          Listo para conducir
                        </small>
                      </div>
                    ) : (
                      <div className="d-inline-flex mt-2 align-items-center gap-1">
                        <i className="ti ti-alert-circle-filled fs-5 text-danger"></i>
                        <small>Reparar para conducir</small>
                      </div>
                    )}

                    <div className="mt-2">
                      {vehicle.buyNowPrice ? (
                        <p className="mb-0 mt-4 d-flex align-items-end">
                          <strong className="fs-2 lh-base">
                            ${vehicle.buyNowPrice}
                          </strong>
                          <span className="small fw-semibold ms-2 pb-1 text-primary">
                            Venta directa
                          </span>
                        </p>
                      ) : null}
                      <p className="m-0">
                        {vehicle.currentOffer > 0 ? (
                          <>
                            <strong className="me-1">
                              ${vehicle.currentOffer.toLocaleString("en-US")}
                            </strong>
                            <small>Oferta actual</small>
                          </>
                        ) : (
                          <small>No hay oferta actualmente</small>
                        )}
                      </p>
                    </div>

                    <button
                      className="btn btn-link px-0 text-decoration-none"
                      onClick={toggleExpanded}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span>Expandir </span>
                        <i className="ti ti-caret-down"></i>
                      </motion.div>
                    </button>
                  </div>
                </motion.div>
              )}

              {expanded && (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, y: "-50%" }}
                  exit={{ opacity: 0, y: "50%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    type: "tween",
                    bounce: 0,
                    ease: "easeInOut",
                  }}
                >
                  <div className="d-flex flex-column align-items-start">
                    <div
                      className="d-grid row-gap-1 w-100"
                      style={{
                        fontSize: "0.8rem",
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">
                          Certificado de salvamento
                        </strong>
                        <span className="text-end">
                          {vehicle.titleCode ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">Número de lote</strong>
                        <span className="text-end">
                          {vehicle.lotNumber ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">Odómetro</strong>
                        <span className="text-end">
                          {vehicle.odometer ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">VIN</strong>
                        <span className="text-end">
                          {vehicle.vin ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">Motor</strong>
                        <span className="text-end">
                          {vehicle.engine ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">Ubicación</strong>
                        <span className="text-end">
                          {vehicle.auctionLocation ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">Fecha de venta</strong>
                        <span className="text-end">
                          {vehicle.saleDate ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">
                          Precio de Subasta
                        </strong>
                        <span className="text-end">
                          {vehicle.maximumBid ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">Compra inmediata</strong>
                        <span className="text-end">
                          ${vehicle.buyNowPrice ?? "No disponible"}
                        </span>
                      </div>
                      <hr className="border-1 border-secondary m-0" />
                      <div className="d-flex justify-content-between">
                        <strong className="opacity-75">Oferta actual</strong>
                        <span className="text-end">
                          ${vehicle.currentOffer ?? "No disponible"}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-link px-0 text-decoration-none"
                      onClick={toggleExpanded}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span>Contraer </span>
                        <i className="ti ti-caret-up"></i>
                      </motion.div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <Link
              href={`/vehicles/${vehicle.vin}?${sp.toString()}`}
              target="_blank"
              className="btn btn-primary w-100 mt-2"
            >
              <span>Me interesa</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTransmissionType(transmission: string | null) {
  switch (transmission?.toUpperCase()) {
    case "AUTOMATIC":
      return "Automático";
    case "MANUAL":
      return "Manual";
    default:
      return "N/A";
  }
}
