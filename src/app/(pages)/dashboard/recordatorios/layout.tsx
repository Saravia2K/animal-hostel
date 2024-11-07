import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Animal Hostel | Recordatorios",
};

export default function RecordatoriosLayout({ children }: PropsWithChildren) {
  return children;
}
