"use client";

import React, { useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth.actions";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

export default function Index() {
  const [error, setError] = useState<null | 401 | 400 | 500>(null);
  const formHandler = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(
      object({
        email: string().email().required("Campo requerido"),
        password: string().required("Campo requerido"),
      }),
    ),
  });
  const handleSubmit = async (data: { email: string; password: string }) => {
    const res = await login(data);
    setError(res);
  };
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
            {error === 500 && (
              <div className="alert alert-danger text-start" role="alert">
                Lo sentimos, ha ocurrido un error intentando iniciar tu sesión,
                por favor vuelve a intentarlo.
              </div>
            )}
            <div className="mt-2">
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
              <form onSubmit={formHandler.handleSubmit(handleSubmit)}>
                <Controller
                  render={({ field, fieldState }) => (
                    <div className="form-group text-start mb-4">
                      <span>Correo electrónico</span>
                      <div className="input-group">
                        <label
                          htmlFor="email"
                          className="input-group-text"
                          aria-label="email"
                        >
                          <i className="ti ti-user"></i>
                        </label>
                        <input
                          className={`form-control${fieldState.invalid || error === 401 ? " border-danger" : ""}`}
                          id="email"
                          type="email"
                          placeholder="usero@example.com"
                          {...field}
                        />
                      </div>
                      {(fieldState.invalid || error === 401) && (
                        <div className="form-text text-danger">
                          {fieldState.error?.message ??
                            "Credenciales incorrectas"}
                        </div>
                      )}
                    </div>
                  )}
                  name="email"
                  control={formHandler.control}
                />
                <Controller
                  render={({ field, fieldState }) => (
                    <div className="form-group text-start mb-4">
                      <span>Contraseña</span>
                      <div className="input-group">
                        <label
                          htmlFor="password"
                          className="input-group-text"
                          aria-label="cntraseña"
                        >
                          <i className="ti ti-key"></i>
                        </label>
                        <input
                          className={`form-control${fieldState.invalid || error === 401 ? " border-danger" : ""}`}
                          id="password"
                          type="password"
                          placeholder="**********"
                          {...field}
                        />
                      </div>
                      {(fieldState.invalid || error === 401) && (
                        <div className="form-text text-danger">
                          {fieldState.error?.message ??
                            "Credenciales incorrectas"}
                        </div>
                      )}
                    </div>
                  )}
                  name="password"
                  control={formHandler.control}
                />

                <button
                  className="btn btn-primary btn-lg w-100"
                  type="submit"
                  disabled={formHandler.formState.isSubmitting}
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
  );
}
