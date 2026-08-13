import type { Metadata } from "next";
import { Geist, Instrument_Serif, Manrope } from "next/font/google";
import ThemeProvider from "@/components/layout/ThemeProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-hpc-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uzay.dev"),
  title: "Uzay Poyraz Dev Portfolio",
  description:
    "Portfolio of Uzay Poyraz. Computer Science graduate from Skidmore College, Davis-UWC Scholar. Software engineering, AI, and full-stack development.",
  openGraph: {
    title: "Uzay Poyraz Dev Portfolio",
    description:
      "Portfolio of Uzay Poyraz. Computer Science graduate, Davis-UWC Scholar. Software engineering, AI, and full-stack development.",
    type: "website",
    url: "https://uzay.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${instrumentSerif.variable} ${manrope.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
