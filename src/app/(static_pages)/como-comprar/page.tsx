import { Card, CardBody, Container } from "react-bootstrap";
import Link from "next/link";

export const metadata = {
  title: "Cómo Comprar - La Subasta Cubana",
  description:
    "Aprende cómo comprar tu próximo vehículo a través de La Subasta Cubana. Proceso paso a paso, desde el registro hasta la entrega de tu auto.",
};

export default function ComoComprarPage() {
  return (
    <Container fluid="xxl" className="py-5">
      <h1 className="mb-4">Guía para Comprar un Auto en La Subasta Cubana</h1>

      <Card className="mb-4">
        <CardBody>
          <p className="lead mb-4">
            Sigue estos sencillos pasos para comprar tu próximo auto a través de
            La Subasta Cubana.
          </p>

          {/* Paso 1 */}
          <div className="mb-5">
            <h2 className="h3 mb-3">Paso 1: Regístrate y elige tu vehículo</h2>
            <p>
              Crea tu cuenta en lasubastacubana.com y accede a nuestro catálogo
              de autos en subasta. Usa los filtros de búsqueda para encontrar el
              vehículo que se ajuste a tus necesidades. Una vez que elijas tu
              auto y determines tu monto máximo de oferta, estarás listo para
              continuar con el proceso.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="mb-5">
            <h2 className="h3 mb-3">Paso 2: Realiza tu Oferta</h2>
            <p>
              Realiza tu oferta sin preocupaciones. Al confirmar la compra de un
              vehículo, se procesará automáticamente un depósito de seguridad.
              Este garantiza tu compromiso y facilita la transacción. Si decides
              no continuar, puedes solicitar el reembolso total del depósito sin
              penalizaciones ni cargos adicionales, o dejarlo disponible para
              futuras compras.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="mb-5">
            <h2 className="h3 mb-3">Paso 3: Completa el Pago de tu Vehículo</h2>
            <p>
              Si tu oferta es la ganadora, deberás completar el pago restante
              del auto. Ofrecemos varias opciones de pago, incluyendo:
            </p>
            <ul>
              <li>Zelle</li>
              <li>PayPal</li>
              <li>
                Cheque oficial emitido por una entidad bancaria (cashier check)
              </li>
              <li>
                Transferencia Bancaria de fondos de disponibilidad inmediata
                (wire transfer)
              </li>
              <li>Giro postal (money order)</li>
              <li>
                Cualquier otro método de pago que garantice la disponibilidad
                inmediata de los fondos a favor de OCI.
              </li>
            </ul>
            <p>
              Si utilizas cualquier método que no sea Zelle, deberás depositar
              los fondos directamente en nuestra cuenta bancaria. Recuerda
              realizar el pago dentro del plazo indicado para asegurar la
              adquisición de tu vehículo.
            </p>
            <p>
              <Link href="/">Contáctanos</Link> ara ayudarte a esclarecer
              cualquier duda que te haya surgido.
            </p>
          </div>

          {/* Paso 4 */}
          <div className="mb-5">
            <h2 className="h3 mb-3">
              Paso 4: Organiza el Transporte de tu Vehículo
            </h2>
            <p>
              Una vez completado el pago, tienes dos opciones para el
              transporte:
            </p>
            <div className="ps-4 mb-3">
              <h3 className="h5 mb-2">
                Gestión del Transporte por Nuestra Parte:
              </h3>
              <p>
                Nuestro equipo facilitará la coordinación con transportistas
                confiables para la entrega de tu vehículo. La Subasta Cubana{" "}
                <strong>
                  no se hace responsable por modificaciones en las fechas de
                  entrega o recogida que se acuerden entre el comprador y la
                  empresa transportadora, ni por cargos adicionales que puedan
                  surgir, como tarifas de almacenamiento
                </strong>
                .
              </p>
              <p>
                Asimismo,{" "}
                <strong>
                  no asumimos responsabilidad alguna por incidentes, retrasos,
                  daños ocurridos durante el transporte o la pérdida de
                  accesorios, tales como llaves o alfombras, en el momento de la
                  entrega al comprador
                </strong>
                . Este servicio tiene como objetivo ofrecerte comodidad, dejando
                la logística en manos de profesionales especializados.
              </p>
            </div>

            <div className="ps-4">
              <h3 className="h5 mb-2">Gestión de Transporte por su Cuenta:</h3>
              <p>
                También puedes gestionar la entrega del vehículo de manera
                autónoma. Elige la empresa de tu confianza y coordina
                directamente con ellos los términos del transporte.
              </p>
            </div>

            <div className="ps-4">
              <p>
                Sea cual sea tu elección, cuenta con nuestro apoyo para que el
                proceso sea lo más fluido y sencillo posible.
              </p>
            </div>
          </div>

          {/* Paso 5 */}
          <div className="mb-5">
            <h2 className="h3 mb-3">Paso 5: Gestión del Título del Vehículo</h2>
            <p>
              Nos encargamos de que la documentación legal de tu auto esté en
              orden:
            </p>

            <div className="ps-4">
              <h3 className="h5 mb-2">Recepción del Título:</h3>
              <p>
                Una vez que la subasta nos envíe el título del vehículo, lo
                recibiremos en nuestras oficinas. El tiempo de procesamiento
                varía según la subasta, pero normalmente toma menos de 5 días.
                Nos aseguramos de monitorear el estado de tu título para que lo
                recibas lo antes posible.
              </p>
              <h3 className="h5 mb-2">Trámites a tu Nombre:</h3>
              <p>
                Después de recibir el título, realizaremos todos los trámites
                necesarios para transferirlo a tu nombre. Nuestro equipo se
                encargará de todos los detalles para garantizar que el título
                esté correctamente registrado.
              </p>
              <h3 className="h5 mb-2">Envío del Título:</h3>
              <p>
                Cuando los trámites estén completados, te enviaremos el título a
                la dirección que nos indiques, utilizando un servicio de
                mensajería seguro para garantizar que el documento llegue
                rápidamente y en perfectas condiciones.
              </p>
            </div>
          </div>

          {/* Sección de Contacto */}
          <div className="bg-light p-4 rounded">
            <h2 className="h4 mb-3">¿Tienes Preguntas?</h2>
            <p className="mb-0">
              Si tienes alguna duda durante el proceso, no dudes en
              contactarnos. Nuestro equipo de atención al cliente está siempre
              disponible para guiarte en cada paso. Además, puedes visitar
              nuestra sección de soporte en el sitio web para obtener más
              información.
            </p>
            <p>
              <Link href="/contacto">Contáctanos</Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
