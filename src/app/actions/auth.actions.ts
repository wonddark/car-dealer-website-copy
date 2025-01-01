"use server";

import { redirect } from "next/navigation";

export async function login(data: { email: string; password: string }) {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    console.log(res.status);

    if (res.status === 401) {
      return 401;
    } else if (res.status === 400) {
      return 400;
    } else if (res.status === 500) {
      return 500;
    }
  } catch (e) {
    console.error(e);
    return 500;
  }
  redirect("/");
}

export async function register(data: { email: string; password: string }) {
  try {
    const res = await fetch(`${process.env.API_ENDPOINT}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 400) {
      return 400;
    } else if (res.status === 500) {
      return 500;
    }
  } catch (e) {
    console.error(e);
    return 500;
  }
  redirect("/login");
}
