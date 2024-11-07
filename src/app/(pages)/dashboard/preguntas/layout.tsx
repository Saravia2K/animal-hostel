import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Animal Hostel | Preguntas",
};

export default function PreguntasLayout({ children }: PropsWithChildren) {
  return children;
}
