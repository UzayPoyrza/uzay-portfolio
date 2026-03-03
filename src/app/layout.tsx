import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Uzay Poyraz — CS Graduate, Builder, Explorer",
  description:
    "Portfolio of Uzay Poyraz. Computer Science graduate from Skidmore College, Davis-UWC Scholar. Software engineering, AI, and full-stack development.",
  openGraph: {
    title: "Uzay Poyraz — CS Graduate, Builder, Explorer",
    description:
      "Portfolio of Uzay Poyraz. Computer Science graduate, Davis-UWC Scholar. Software engineering, AI, and full-stack development.",
    type: "website",
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
        className={`${geist.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
