import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import NProgressProvider from "@/providers/NProgressProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import LocalizationProvider from "@/providers/LocalizationProvider";
import LoadingOverlayProvider from "@/providers/LoadingOverlayProvider";
import ToastifyProvider from "@/providers/ToastifyProvider";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";

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
          <ReactQueryProvider>
            <LocalizationProvider>
              <ToastifyProvider>
                <LoadingOverlayProvider>{children}</LoadingOverlayProvider>
              </ToastifyProvider>
            </LocalizationProvider>
          </ReactQueryProvider>
        </NProgressProvider>
      </body>
    </html>
  );
}
