import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barre Digital — Soluciones digitales",
  description:
    "Barre Digital diseña y desarrolla soluciones digitales pensadas para resolver necesidades concretas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
