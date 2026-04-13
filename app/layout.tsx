import type { Metadata } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";
import CustomCursor from "@/components/effects/CustomCursor";
import LoadingScreen from "@/components/effects/LoadingScreen";

// Bold display font for headings — cinematic and powerful
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Clean, modern body font
const barlow = Barlow({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "One Rep Max | Push Beyond Your Limits",
  description:
    "One Rep Max is a premium high-performance gym designed for athletes who demand the absolute best from their training environment. Join now and transform your body.",
  keywords: [
    "gym",
    "fitness",
    "personal training",
    "elite gym",
    "weight training",
    "bodybuilding",
    "premium gym",
    "one rep max",
  ],
  openGraph: {
    title: "One Rep Max | Push Beyond Your Limits",
    description: "Premium high-performance training facility. Join now.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${barlow.variable} font-body bg-black text-white antialiased`}
      >
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
