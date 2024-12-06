"use client";
import Link from "next/link";

const Login = () => {
  return (
    <>
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
              <div className="register-form mt-2">
                <button
                  type="button"
                  className="btn btn-lg btn-outline-primary w-100 mb-2"
                >
                  <span className="fab fa-google" />
                  Conectar con Google
                </button>
                <div className="d-flex align-items-center gap-2">
                  <hr className="flex-fill text-muted" />
                  <span>o con correo y contraseña</span>
                  <hr className="flex-fill text-muted" />
                </div>
                <form>
                  <div className="form-group text-start mb-4">
                    <span>Nombre de usuario</span>
                    <label htmlFor="username">
                      <i className="ti ti-user"></i>
                    </label>
                    <input
                      className="form-control"
                      id="username"
                      type="email"
                      placeholder="usero@example.com"
                    />
                  </div>
                  <div className="form-group text-start mb-4">
                    <span>Contraseña</span>
                    <label htmlFor="password">
                      <i className="ti ti-key"></i>
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="**********"
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit"
                  >
                    Iniciar sesión
                  </button>
                </form>
              </div>

              <div className="login-meta-data">
                <Link
                  className="forgot-password d-block mt-3 mb-1"
                  href="/forget-password"
                >
                  Olvidé mi contraseña
                </Link>
                <p className="mb-0 small fw-light">
                  <small>
                    ¿Aún no tienes una cuenta?
                    <Link className="mx-1 fw-light" href="/register">
                      Regístrate ahora
                    </Link>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
