import Link from "next/link";

const ForgetPasswordSuccess = () => {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-8">
            <div className="success-check">
              <i className="ti ti-mail-check"></i>
            </div>

            <p className="text-white mt-3 mb-4">
              Se ha enviado un mensaje a tu bandeja de correo para restablecer
              tu contraseña.
            </p>
            <Link className="btn btn-warning btn-lg" href="/">
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordSuccess;
