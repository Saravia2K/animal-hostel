import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NProgressProvider from "@/providers/NProgressProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animal Hostel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <NProgressProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NProgressProvider>
      </body>
    </html>
  );
}
