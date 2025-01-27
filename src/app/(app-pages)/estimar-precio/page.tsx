import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  ListGroup,
  ListGroupItem,
  Stack,
} from "react-bootstrap";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export default function PriceCalculator() {
  return (
    <Container fluid="xxl">
      <h1>Estimador de costo</h1>

      <Card>
        <CardBody>
          <div
            className="d-grid gap-2"
            style={{
              gridTemplateColumns: "1fr 1.2fr",
            }}
          >
            <Stack direction="vertical">
              <p className="display-6 fs-5 mb-1">Subasta</p>
              <ToggleGroup.Root
                type="single"
                className="d-inline-flex align-items-stretch"
              >
                <ToggleGroup.Item
                  value="copart"
                  className="btn flex-fill btn-outline-secondary rounded-0 rounded-start border-end-0 btn-toggle"
                >
                  Copart
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="manheim"
                  className="btn flex-fill btn-outline-secondary rounded-0 btn-toggle"
                >
                  Manheim
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="iia"
                  className="btn flex-fill btn-outline-secondary rounded-0 rounded-end border-start-0 btn-toggle"
                >
                  IIA
                </ToggleGroup.Item>
              </ToggleGroup.Root>
              <p className="display-6 fs-5 mt-3 mb-1">Tipo de Título</p>
              <ToggleGroup.Root
                type="single"
                className="d-inline-flex align-items-stretch"
              >
                <ToggleGroup.Item
                  value="clean"
                  className="btn btn-outline-secondary flex-fill rounded-0 rounded-start"
                >
                  Título limpio
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="savage"
                  className="btn btn-outline-secondary flex-fill rounded-0 rounded-end"
                >
                  Titulo de salvamento
                </ToggleGroup.Item>
              </ToggleGroup.Root>
              <p className="display-6 fs-5 mt-3 mb-1">Peso del vehículo</p>
              <ToggleGroup.Root type="single" className="hstack">
                <ToggleGroup.Item
                  value="light"
                  className="btn btn-outline-secondary flex-fill rounded-0 rounded-start"
                >
                  Vehículo ligero
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="heavy"
                  className="btn btn-outline-secondary flex-fill rounded-0 rounded-end"
                >
                  Vehículo pesado
                </ToggleGroup.Item>
              </ToggleGroup.Root>
              <p className="display-6 fs-5 mt-3 mb-1">Oferta máxima</p>
              <Stack direction="horizontal">
                <Button className="rounded-end-0" variant="outline-secondary">
                  <i className="ti ti-minus"></i>
                </Button>
                <FormControl
                  type="text"
                  className="flex-fill text-center rounded-0"
                />
                <Button className="rounded-start-0" variant="outline-secondary">
                  <i className="ti ti-plus"></i>
                </Button>
              </Stack>
              <Button className="mt-3 w-50 mx-auto">Calcular</Button>
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
