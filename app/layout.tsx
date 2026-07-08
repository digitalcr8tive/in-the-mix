import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "In The Mix | Mobile Bartending in Little Rock",
  description:
    "Premium mobile bartending for weddings, private parties, corporate events, and special occasions in Little Rock, Arkansas."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
