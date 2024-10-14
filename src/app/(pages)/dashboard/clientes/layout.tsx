import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animal Hostel | Clientes",
};

export default function ClientesLayout({ children }: PropsWithChildren) {
  return children;
}
