import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animal Hostel | Mascotas",
};

export default function MascotasLayout({ children }: PropsWithChildren) {
  return children;
}
