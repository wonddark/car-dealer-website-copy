"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";
import { register } from "@/app/actions/auth.actions";

export default function Index() {
  const [error, setError] = useState<null | 400 | 500>(null);
  const formHandler = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    resolver: yupResolver(
      object({
        email: string().email().required("Campo requerido"),
        password: string().required("Campo requerido"),
        confirmPassword: string().oneOf([ref("password")]),
      }),
    ),
  });
  const handleSubmit = async (data: { email: string; password: string }) => {
    const res = await register(data);
    setError(res);
  };
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-10 col-lg-8">
            <Link href="/">
              <img src="/assets/img/core-img/logo-round.png" alt="" />
            </Link>
            {error === 500 && (
              <div className="alert alert-danger text-start" role="alert">
                Lo sentimos, ha ocurrido un error intentando iniciar tu sesión,
                por favor vuelve a intentarlo.
              </div>
            )}
            <div className="mt-5">
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
              <form onSubmit={formHandler.handleSubmit(handleSubmit)}>
                <Controller
                  render={({ field, fieldState }) => (
                    <div className="form-group text-start mb-4">
                      <span>Correo electrónico</span>
                      <div className="input-group">
                        <label
                          htmlFor="username"
                          className="input-group-text"
                          aria-label="correo electrónico"
                        >
                          <i className="ti ti-user"></i>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="user@example.com"
                          className={`form-control${fieldState.invalid || error === 400 ? " border-danger" : ""}`}
                          {...field}
                        />
                      </div>
                      {fieldState.invalid ||
                        (error === 400 && (
                          <div className="form-text text-danger">
                            {fieldState.error?.message ?? "Error de registro"}
                          </div>
                        ))}
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
                          aria-label="contraseña"
                        >
                          <i className="ti ti-key"></i>
                        </label>
                        <input
                          id="password"
                          type="password"
                          placeholder="**********"
                          className={`form-control${fieldState.invalid || error === 400 ? " border-danger" : ""}`}
                          {...field}
                        />
                      </div>
                      {fieldState.invalid ||
                        (error === 400 && (
                          <div className="form-text text-danger">
                            {fieldState.error?.message ?? "Error de registro"}
                          </div>
                        ))}
                    </div>
                  )}
                  name="password"
                  control={formHandler.control}
                />
                <Controller
                  render={({ field, fieldState }) => (
                    <div className="form-group text-start mb-4">
                      <span>Confirma la contraseña</span>
                      <div className="input-group">
                        <label
                          htmlFor="confirmPassword"
                          className="input-group-text"
                          aria-label="confirmar contraseña"
                        >
                          <i className="ti ti-key"></i>
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          placeholder="**********"
                          className={`form-control${fieldState.invalid || error === 400 ? " border-danger" : ""}`}
                          {...field}
                        />
                      </div>
                      {fieldState.invalid ||
                        (error === 400 && (
                          <div className="form-text text-danger">
                            {fieldState.error?.message ?? "Error de registro"}
                          </div>
                        ))}
                    </div>
                  )}
                  name="confirmPassword"
                  control={formHandler.control}
                />
                <button className="btn btn-primary btn-lg w-100" type="submit">
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
  );
}
