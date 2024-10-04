"use client";

import React, { type PropsWithChildren } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NProgressProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#7fc243"
        options={{ showSpinner: false }}
      />
    </>
  );
}
