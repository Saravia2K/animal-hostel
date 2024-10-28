import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animal Hostel | Encargados",
};

export default function EncargadosLayout({ children }: PropsWithChildren) {
  return children;
}
