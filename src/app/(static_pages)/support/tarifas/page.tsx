import { Card, CardBody, Container, Table } from "react-bootstrap";

export const metadata = {
  title: "Tarifas - La Subasta Cubana",
  description:
    "Información detallada sobre nuestras tarifas y cargos por servicios de subasta de vehículos.",
};

export default function TarifasPage() {
  return (
    <Container fluid="xxl" className="py-5">
      <h1 className="mb-4">Tarifas - La Subasta Cubana</h1>

      {/* 1. Cargo por Broker */}
      <Card className="mb-4">
        <CardBody>
          <h2>1. Cargo por Broker</h2>
          <p className="mb-3">
            <strong>Descripción:</strong> Esta tarifa te permite participar en
            subastas de autos sin necesidad de una licencia. Incluye la comisión
            por nuestro trabajo como intermediarios, encargándonos de todo el
            proceso para que puedas aprovechar las mejores oportunidades de
            manera rápida y segura.
          </p>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Rango</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 - $5999.99</td>
                <td>$399.00</td>
              </tr>
              <tr>
                <td>$6000 - $10999.99</td>
                <td>$499.00</td>
              </tr>
              <tr>
                <td>$11000.00 - $14999.99</td>
                <td>$599.00</td>
              </tr>
              <tr>
                <td>$15000.00+</td>
                <td>$699.00</td>
              </tr>
            </tbody>
          </Table>

          <p className="mt-3">
            Por esta tarifa, te representamos en subastas privadas y públicas
            como Copart, IAA y Manheim, ocupándonos de todo el proceso, desde la
            búsqueda del auto ideal hasta hacer la oferta. Nos aseguramos de que
            consigas el mejor precio posible.
          </p>
        </CardBody>
      </Card>

      {/* 2. Servicio de Asesoría Profesional */}
      <Card className="mb-4">
        <CardBody>
          <h2>2. Servicio de Asesoría Profesional</h2>
          <p>
            <strong>Monto:</strong> $149.00
          </p>
          <p>
            <strong>Descripción:</strong> Asesoramiento experto y asistencia
            personalizada durante todo el proceso de la subasta.
          </p>
          <p>
            <strong>Detalles del Servicio:</strong> Este servicio opcional
            ofrece la asistencia personalizada de un experto que te guiará en la
            evaluación de vehículos y en la formulación de estrategias de
            ofertas exitosas. El servicio incluye hasta cuatro (4) sesiones de
            treinta (30) minutos cada una. Si necesitas sesiones adicionales,
            cada una tendrá un costo de $50.00.
          </p>
          <p>
            <strong>Recomendación:</strong> Esta asesoría es muy recomendable
            para aquellas personas que no posean una experiencia suficiente en
            compras de autos en subastas o apenas están comenzando.
          </p>
        </CardBody>
      </Card>

      {/* 3. Depósito de Seguridad */}
      <Card className="mb-4">
        <CardBody>
          <h2>3. Depósito de Seguridad / Poder de Compra</h2>
          <p>
            <strong>Descripción:</strong> El depósito de seguridad te otorga el
            poder de compra, ya que garantiza tu participación en la subasta.
          </p>
          <p>
            <strong>Monto:</strong> El depósito varía según la oferta máxima que
            establezcas para los vehículos seleccionados y la subasta
            correspondiente.
          </p>
          <p>
            Es importante destacar que este depósito no representa un costo
            adicional; más bien, es una medida de seguridad reembolsable en caso
            de que el vehículo no sea adquirido.
          </p>
        </CardBody>
      </Card>

      {/* 4. Coordinación de Transporte */}
      <Card className="mb-4">
        <CardBody>
          <h2>4. Coordinación de Transporte</h2>
          <p>
            Nuestro equipo facilitará la coordinación con transportistas
            confiables para la entrega de tu vehículo. La Subasta Cubana no se
            hace responsable por modificaciones en las fechas de entrega o
            recogida que se acuerden entre el comprador y la empresa
            transportadora, ni por cargos adicionales que puedan surgir.
          </p>
        </CardBody>
      </Card>

      {/* 5. Gestión de Traspaso */}
      <Card className="mb-4">
        <CardBody>
          <h2>5. Gestión de Traspaso</h2>
          <p>
            <strong>Monto:</strong> $149.00
          </p>
          <p>
            <strong>Descripción:</strong> Cubre el traspaso del título del
            vehículo, asegurando que todos los trámites se gestionen de manera
            adecuada.
          </p>
          <ul>
            <li>
              <strong>Recepción del Título:</strong> Procesamiento en menos de 5
              días normalmente.
            </li>
            <li>
              <strong>Trámites a tu Nombre:</strong> Gestión completa de la
              transferencia.
            </li>
            <li>
              <strong>Envío del Título:</strong> Envío seguro a tu dirección.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* 6. Servicio de Broker y Fees */}
      <Card className="mb-4">
        <CardBody>
          <h2>6. Servicio de Broker</h2>
          <h3>Fees Básicos:</h3>
          <ul>
            <li>Fee de Broker - $399</li>
            <li>Fee de traspaso - $150</li>
          </ul>

          <h3>Fees de Subasta en Copart</h3>
          <p>Para un vehículo con Título Salvage, subastado por $3750:</p>
          <ul>
            <li>Fee de Copart - $555</li>
            <li>Fee de Portón - $95</li>
            <li>Tarifa de oferta virtual - $100</li>
            <li>Tarifa de envío de Título - $20</li>
            <li>Tarifa medio-ambiental - $10</li>
          </ul>

          <h3>Gastos Extras</h3>
          <ul>
            <li>Transportación - $150</li>
            <li>Costo del Arreglo - $2000</li>
            <li>Impuestos o Taxes del Estado (7%) - $345.03</li>
          </ul>

          <div className="mt-4">
            <h3>Resumen Total</h3>
            <p>
              Todo esto hace un total de <strong>$7574.03</strong> y estos
              vehículos hoy en día poseen un valor en el mercado por encima de
              los $10000, te estarías ahorrando mínimo <strong>$2425.97</strong>
              .
            </p>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
