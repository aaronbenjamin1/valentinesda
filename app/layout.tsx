import "./globals.css";
import { Inter, Caveat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
});

export const metadata = {
  title: "ValentineOS",
  description: "A tiny scrapbook of chaos and love.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}