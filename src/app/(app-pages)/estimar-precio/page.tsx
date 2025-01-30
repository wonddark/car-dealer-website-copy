"use client";

import {
  Card,
  CardBody,
  Container,
  FormCheck,
  FormControl,
  FormSelect,
  ListGroup,
  ListGroupItem,
  Stack,
} from "react-bootstrap";
import * as Slider from "@radix-ui/react-slider";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import { useState } from "react";

export default function PriceCalculator() {
  const MAX_OFFER = 500_000;
  const MIN_OFFER = 250;
  const [maxOffer, setMaxOffer] = useState(MIN_OFFER);
  const updateMaxOffer = (val: number[]) => setMaxOffer(val[0]);

  return (
    <Container fluid="xxl">
      <h1>Estimador de costo</h1>

      <Card>
        <CardBody>
          <div
            className="d-grid"
            style={{
              gridTemplateColumns: "1.15fr 1fr",
            }}
          >
            <Stack direction="vertical">
              <p className="display-6 fs-5 mb-1">Subasta</p>
              <FormSelect>
                <option value="">Escoge una subasta</option>
                <option value="copart">Copart</option>
                <option value="manheim">Manheim</option>
                <option value="iia">IIA</option>
              </FormSelect>

              <p className="display-6 fs-5 mt-3 mb-1">Tipo de Título</p>
              <FormCheck className="d-flex gap-3">
                <FormCheckLabel className="d-flex align-items-center gap-1">
                  <FormCheckInput
                    type="radio"
                    name="title-type"
                    value="clean"
                  />
                  <span>Limpio</span>
                </FormCheckLabel>
                <FormCheckLabel className="d-flex align-items-center gap-1">
                  <FormCheckInput
                    type="radio"
                    name="title-type"
                    value="salvage"
                  />
                  <span>Salvamento</span>
                </FormCheckLabel>
              </FormCheck>

              <p className="display-6 fs-5 mt-3 mb-1">Peso del vehículo</p>
              <FormCheck className="d-flex gap-3">
                <FormCheckLabel className="d-flex align-items-center gap-1">
                  <FormCheckInput type="radio" name="weigth" value="light" />
                  <span>Ligero</span>
                </FormCheckLabel>
                <FormCheckLabel className="d-flex align-items-center gap-1">
                  <FormCheckInput type="radio" name="weigth" value="heavy" />
                  <span>Pesado</span>
                </FormCheckLabel>
              </FormCheck>

              <p className="display-6 fs-5 mt-3 mb-1">Oferta máxima</p>
              <Slider.Root
                className="slider-root"
                min={MIN_OFFER}
                max={MAX_OFFER}
                step={250}
                onValueChange={updateMaxOffer}
              >
                <Slider.Track className="slider-track">
                  <Slider.Range className="slider-range" />
                </Slider.Track>
                <Slider.Thumb className="slider-thumb" />
              </Slider.Root>
              <FormControl
                type="text"
                className="text-center"
                value={maxOffer}
              />
            </Stack>
            <Stack direction="vertical">
              <p className="display-6 text-center border-bottom border-secondary pb-1">
                Costo final estimado
              </p>
              <p className="text-success fs-4 text-center">
                $8000 <span>*</span>
              </p>
              <ListGroup>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Su oferta máxima</span>
                  <strong className="text-end fw-normal">$7,000.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Tarifa por Tutoría</span>
                  <strong className="text-end fw-normal">
                    $0.00{" "}
                    <s className="text-muted">
                      <small>$149.00</small>
                    </s>
                  </strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Tarifa de la Subasta Cubana </span>
                  <strong className="text-end fw-normal">$499.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Tarifa de IAAI</span>
                  <strong className="text-end fw-normal">$880.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Tarifa de Oferta Virtual</span>
                  <strong className="text-end fw-normal">$125.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Tarifa de Servicio</span>
                  <strong className="text-end fw-normal">$95.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Tarifa medioambiental</span>
                  <strong className="text-end fw-normal">$15.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Gestión de traspaso</span>
                  <strong className="text-end fw-normal">$180.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Tarifas de envío del título</span>
                  <strong className="text-end fw-normal">$20.00</strong>
                </ListGroupItem>
                <ListGroupItem className="d-inline-flex justify-content-between">
                  <span>Total</span>
                  <strong className="text-end fw-normal">$8,814.00</strong>
                </ListGroupItem>
              </ListGroup>
              <p>
                <small>* Este es solo un estimado y no el costo final.</small>
              </p>
            </Stack>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
