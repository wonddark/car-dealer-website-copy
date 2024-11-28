"use client";

import { ReactNode, useEffect } from "react";
import { animationCreate } from "@/utils/utils";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // animation
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      <ToastContainer position="top-right" />
    </>
  );
};

export default Wrapper;
