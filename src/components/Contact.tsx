"use client";

import React from "react";
import Footer from "@/layouts/Footer";
import HeaderTwo from "@/layouts/HeaderTwo";

const Contact = () => {
  return (
    <>
      <HeaderTwo links="" title="Contact" />

      <div className="page-content-wrapper">
        <div className="container google-maps-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d895.7419482618508!2d-80.3661227304297!3d26.099969998571307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDA1JzU5LjkiTiA4MMKwMjEnNTUuNyJX!5e0!3m2!1sen!2sae!4v1733497993940!5m2!1sen!2sae"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de las oficinas de la Subasta Cubana"
          ></iframe>
        </div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="rtl-text-right mb-4">
                <h5 className="mb-1">Contactanos</h5>
                <p>
                  En <strong>La Subasta Cubana</strong>, estamos comprometidos a
                  ayudarte a encontrar el auto perfecto. Nuestro equipo de
                  expertos está disponible para asistirte en cada paso del
                  proceso de compra, asegurando una experiencia sin
                  complicaciones. No dudes en ponerte en contacto con nosotros a
                  través de los siguientes canales:
                </p>

                <div className="d-flex fs-1 justify-content-center gap-5">
                  <a href="https://www.facebook.com/lasubastacubana">
                    <i className="ti ti-brand-facebook-filled text-primary"></i>
                  </a>
                  <a href="https://www.instagram.com/lasubastacubana">
                    <i className="ti ti-brand-instagram text-primary"></i>
                  </a>
                  <a href="https://www.youtube.com/@LaSubastaCubana">
                    <i className="ti ti-brand-youtube text-primary"></i>
                  </a>
                </div>
              </div>

              <div className="contact-form mt-3">
                <form>
                  <input
                    className="form-control border mb-3"
                    id="username"
                    type="text"
                    placeholder="Nombre completo"
                  />
                  <input
                    className="form-control border mb-3"
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                  />
                  <textarea
                    className="form-control border mb-3"
                    id="message"
                    name=""
                    cols={30}
                    rows={10}
                    placeholder="Déjanos saber qué podemos ayudarte"
                  ></textarea>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="pb-3"></div>
        </div>
      </div>

      <div className="internet-connection-status" id="internetStatus"></div>

      <Footer />
    </>
  );
};

export default Contact;
