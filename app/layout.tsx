import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.GITHUB_PAGES === "true" ? "/in-the-mix" : "";
const siteUrl = "https://digitalcr8tive.github.io";
const logoImage = `${basePath}/icon-512.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "In The Mix | Mobile Bartending in Little Rock",
  description:
    "Premium mobile bartending for weddings, private parties, corporate events, and special occasions in Little Rock, Arkansas.",
  icons: {
    icon: [
      { url: `${basePath}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: logoImage, sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "In The Mix | Mobile Bartending in Little Rock",
    description:
      "Premium mobile bartending for weddings, private parties, corporate events, and special occasions in Little Rock, Arkansas.",
    url: `${basePath}/`,
    siteName: "In The Mix",
    images: [
      {
        url: logoImage,
        width: 512,
        height: 512,
        alt: "In The Mix Bartending logo"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "In The Mix | Mobile Bartending in Little Rock",
    description:
      "Premium mobile bartending for weddings, private parties, corporate events, and special occasions in Little Rock, Arkansas.",
    images: [logoImage]
  }
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
