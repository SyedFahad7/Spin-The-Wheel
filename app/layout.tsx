import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BetterBugs Spin the Wheel",
  description: "Spin the Wheel activation for BetterBugs at QonFX",
  icons: {
    icon: "/favicon.ico"
  }
};

const outfit = localFont({
	src: "../public/fonts/Outfit.ttf",
	variable: "--font-outfit",
	display: "swap",
	weight: "100 900",
});


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} bg-secondary text-secondary antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}


