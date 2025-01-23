import { Card, CardBody, Container } from "react-bootstrap";

export const metadata = {
  title: "¿Quiénes Somos? - La Subasta Cubana",
  description:
    "Conoce más sobre La Subasta Cubana, tu aliado confiable en la compra de vehículos a través de subastas en Estados Unidos.",
};

export default function QuienesSomosPage() {
  return (
    <Container fluid="xxl" className="py-5">
      <h1 className="mb-4">¿Quiénes Somos?</h1>

      <Card className="mb-4">
        <CardBody>
          <p className="mb-4">
            La Subasta Cubana nace en 2024 como respuesta a las necesidades de
            la creciente comunidad cubana en Estados Unidos, que enfrenta retos
            significativos al buscar el vehículo ideal. Conscientes de los altos
            costos asociados a los concesionarios tradicionales y la demanda
            creciente de vehículos, decidimos crear un espacio donde la compra
            de automóviles se convierta en una experiencia accesible,
            transparente y confiable.
          </p>

          <p className="mb-4">
            Nuestra misión es ofrecerte las mejores oportunidades de compra en
            tu camino hacia el carro de tus sueños. En La Subasta Cubana,
            facilitamos el acceso a una amplia gama de vehículos a través de
            subastas públicas y privadas como Copart, IAA y Manheim. Nos
            especializamos en conectar a nuestros clientes con vehículos de
            calidad, permitiéndote explorar opciones que se ajusten a tus
            necesidades y presupuesto.
          </p>

          <p className="mb-4">
            Estamos Comprometidos a ser tu aliado en todo el proceso de compra.
            Desde la búsqueda inicial hasta la adquisición final, brindándote el
            apoyo que necesites, en cada etapa. Te proporcionamos herramientas y
            conocimientos específicos sobre las subastas, asegurando que
            entiendas cada paso y que puedas tomar decisiones informadas.
          </p>

          <p className="mb-4">
            En La Subasta Cubana, creemos que todos merecen la oportunidad de
            adquirir el vehículo que desean sin complicaciones ni sorpresas. Por
            eso, garantizamos que cada miembro de nuestra comunidad tenga acceso
            a las subastas de autos, con la certeza de que estás recibiendo un
            servicio de calidad.
          </p>

          <p className="mb-0">
            Al elegir La Subasta Cubana, no solo tendrás la oportunidad de
            adquirir un vehículo a precios mayoristas, evitando las ganancias de
            concesionarios e intermediarios; también te unirás a una familia que
            valora la confianza, la transparencia y el compromiso con cada uno
            de nuestros clientes. Juntos, transformaremos tu experiencia de
            compra en una aventura emocionante y satisfactoria.
          </p>
        </CardBody>
      </Card>
    </Container>
  );
}
