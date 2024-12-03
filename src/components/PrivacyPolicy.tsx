import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <HeaderTwo links="" title="Privacy Policy" />

      <div className="page-content-wrapper">
        <div className="container">
          <div className="py-3">
            <h5>Política de Privacidad</h5>
            <p>
              En La Subasta Cubana, valoramos su privacidad y estamos
              comprometidos a proteger la información personal que nos
              proporciona. A continuación, detallamos cómo recopilamos, usamos y
              protegemos su información:
            </p>
            <h6>Principios Generales</h6>
            <p>
              <ol>
                <li>
                  Una vez introducida su información personal (dígase nombre,
                  dirección, correo electrónico y número de teléfono a nuestro
                  sitio web) estos estarán sujetos a los términos de la Política
                  de Privacidad expresados aquí.
                </li>
                <li>
                  Esta información permanecerá protegida, salvo que por
                  imposición legal o en virtud de un acuerdo o petición emitida
                  por el Regulador Fiscal u otra autoridad legal o reguladora
                  competente, deba ser compartida con dichas instancias.
                </li>
                <li>
                  Los datos deberán ser accesibles solo para nosotros, nuestros
                  agentes, o una empresa controlada por nosotros; y serán
                  procesados o utilizados por nosotros para los propósitos y de
                  una manera compatible con el cumplimiento de nuestra
                  obligación en virtud de los usos legales admitidos.
                </li>
                <li>
                  La información obtenida de usted será tratada por nosotros en
                  forma confidencial y no será revelada a terceros.
                </li>
              </ol>
            </p>
            <h6>Información que Recopilamos</h6>
            <p>
              <ol>
                <li>
                  Recopilamos diferentes tipos de datos personales de los
                  usuarios (nombre y apellidos, correo electrónico, número de
                  teléfono, historial de compras y métodos de pago), con el
                  objetivo de ofrecer una experiencia personalizada.
                </li>
                <li>
                  Los datos obtenidos se archivan en nuestro servidor de modo
                  encriptado para proteger la privacidad. Los recopilamos para
                  ofrecer una atención individual que permita solucionar los
                  problemas y necesidades de cada cliente por parte de nuestro
                  equipo de soporte; así como facilitar las transacciones,
                  compras y la comunicación de y con nuestros clientes.
                </li>
                <li>
                  Para solicitar la eliminación de su cuenta, por favor contacte
                  a nuestro equipo de soporte llamando al +1 786 600 2222 o
                  enviando un correo electrónico a soporte@lasubastacubana.com.
                  Estaremos encantados de asistirle.
                </li>
              </ol>
            </p>
            <h6>Uso de la Información</h6>
            <p>Utilizamos la información recopilada para:</p>
            <p>
              <ol>
                <li>
                  Por defecto, La Subasta Cubana enviará notificaciones y
                  comunicaciones usando la información de contacto almacenada en
                  el perfil del usuario.
                </li>
                <li>
                  Sus datos podrán ser usados para notificarle sobre información
                  referente a nuestras ofertas, el estado de sus transacciones u
                  otras notificaciones enviadas por La Subasta Cubana.
                </li>
                <li>
                  El usuario tiene la opción de aceptar o rechazar la recepción
                  de estas notificaciones. Del mismo modo, si en algún momento
                  desea dejar de recibir futuras notificaciones, puede ponerse
                  en contacto con nuestro equipo de soporte llamando al +1 786
                  600 2222 o enviando un correo electrónico a
                  soporte@lasubastacubana.com. Estaremos encantados de ayudarle
                  con su solicitud.
                </li>
              </ol>
            </p>
          </div>
        </div>
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
