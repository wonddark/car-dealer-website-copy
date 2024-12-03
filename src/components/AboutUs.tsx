import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import React from "react";

const AboutUs = () => {
  return (
    <>
      <HeaderTwo links="home" title="About Us" />

      <div className="page-content-wrapper py-3">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="about-content-wrap dir-rtl">
                <p>
                  La Subasta Cubana nace en 2024 como respuesta a las
                  necesidades de la creciente comunidad cubana en Estados
                  Unidos, que enfrenta retos significativos al buscar el
                  vehículo ideal. Conscientes de los altos costos asociados a
                  los concesionarios tradicionales y la demanda creciente de
                  vehículos, decidimos crear un espacio donde la compra de
                  automóviles se convierta en una experiencia accesible,
                  transparente y confiable.
                </p>

                <p>
                  Nuestra misión es ofrecerte las mejores oportunidades de
                  compra en tu camino hacia el carro de tus sueños. En La
                  Subasta Cubana, facilitamos el acceso a una amplia gama de
                  vehículos a través de subastas públicas y privadas como
                  Copart, IAA y Manheim. Nos especializamos en conectar a
                  nuestros clientes con vehículos de calidad, permitiéndote
                  explorar opciones que se ajusten a tus necesidades y
                  presupuesto.
                </p>

                <p>
                  Estamos Comprometidos a ser tu aliado en todo el proceso de
                  compra. Desde la búsqueda inicial hasta la adquisición final,
                  brindándote el apoyo que necesites, en cada etapa. Te
                  proporcionamos herramientas y conocimientos específicos sobre
                  las subastas, asegurando que entiendas cada paso y que puedas
                  tomar decisiones informadas.
                </p>

                <p>
                  En La Subasta Cubana, creemos que todos merecen la oportunidad
                  de adquirir el vehículo que desean sin complicaciones ni
                  sorpresas. Por eso, garantizamos que cada miembro de nuestra
                  comunidad tenga acceso a las subastas de autos, con la certeza
                  de que estás recibiendo un servicio de calidad.
                </p>

                <p>
                  Al elegir La Subasta Cubana, no solo tendrás la oportunidad de
                  adquirir un vehículo a precios mayoristas, evitando las
                  ganancias de concesionarios e intermediarios; también te
                  unirás a una familia que valora la confianza, la transparencia
                  y el compromiso con cada uno de nuestros clientes. Juntos,
                  transformaremos tu experiencia de compra en una aventura
                  emocionante y satisfactoria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="internet-connection-status" id="internetStatus"></div>

      <Footer />
    </>
  );
};

export default AboutUs;
