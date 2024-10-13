"use client";

import { PropsWithChildren } from "react";
import { Bounce, ToastContainer } from "react-toastify";

export default function ToastifyProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer hideProgressBar closeOnClick transition={Bounce} />
    </>
  );
}
