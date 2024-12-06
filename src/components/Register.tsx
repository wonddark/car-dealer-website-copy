import Link from "next/link";

const Register = () => {
  return (
    <>
      <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8">
              <Link href="/">
                <img src="/assets/img/core-img/logo-round.png" alt="" />
              </Link>
              <div className="register-form mt-5">
                <button
                  type="button"
                  className="btn btn-lg btn-outline-primary w-100 mb-2"
                >
                  <span className="fab fa-google" />
                  Conectar con Google
                </button>
                <div className="d-flex align-items-center gap-2">
                  <hr className="flex-fill text-muted" />
                  <span>o utiliza correo y contraseña</span>
                  <hr className="flex-fill text-muted" />
                </div>
                <form>
                  <div className="form-group text-start mb-4">
                    <span>Nombre completo</span>
                    <label htmlFor="username">
                      <i className="ti ti-user"></i>
                    </label>
                    <input
                      className="form-control"
                      id="fullname"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group text-start mb-4">
                    <span>Correo electrónico</span>
                    <label htmlFor="email">
                      <i className="ti ti-at"></i>
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="form-group text-start mb-4">
                    <span>Contraseña</span>
                    <label htmlFor="password">
                      <i className="ti ti-key"></i>
                    </label>
                    <input
                      className="input-psswd form-control"
                      id="registerPassword"
                      type="password"
                      placeholder="**********"
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit"
                  >
                    Regístrate
                  </button>
                </form>
              </div>

              <div className="login-meta-data">
                <p className="mt-3 mb-0 fw-light">
                  ¿Ya tienes una cuenta?
                  <Link className="mx-1 fw-light" href="/login">
                    Acceder
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
