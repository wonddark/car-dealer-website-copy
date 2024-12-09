import React from "react";
import Link from "next/link";

const ForgetPassword = () => {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-8">
            <Link href="/">
              <img
                src="/assets/img/core-img/logo-round.png"
                alt="la subasta cubana"
                className="mb-5"
              />
            </Link>

            <div className="register-form mt-5">
              <form action="/forget-password-success" method="">
                <div className="form-group text-start mb-4">
                  <span>Correo electrónico</span>
                  <label htmlFor="email">
                    <i className="ti ti-user"></i>
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    type="text"
                    placeholder="Designing World"
                  />
                </div>
                <button className="btn btn-primary btn-lg w-100" type="submit">
                  Restablecer contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
