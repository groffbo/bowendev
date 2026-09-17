import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const windows95 = localFont({
  src: "./assets/Windows Regular.ttf",
  variable: "--font-windows95",
  display: "swap",
  fallback: ["Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Bowen's Desktop",
  description: "Hello World! I'm Bowen, current AMD Undergrad Research Fellow, previous intern at AMD and L3Harris, Knight Hacks Director, and Computer Engineer at UCF. Interested in GPU programming and HPC"
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={windows95.className}>
      <body style={{ backgroundColor: "#008080", margin: 0, padding: 0, height: "100vh", width: "100vw", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
