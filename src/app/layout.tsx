import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { GSAPProvider } from "@/providers/GSAPProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Nissim Zarur | Senior Full Stack Engineer & AI Architect",
  description:
    "Portfolio of Nissim Zarur — Senior Full Stack Engineer and AI Architect specializing in building scalable web applications, intelligent systems, and modern cloud-native solutions.",
  openGraph: {
    title: "Nissim Zarur | Senior Full Stack Engineer & AI Architect",
    description:
      "Senior Full Stack Engineer and AI Architect specializing in scalable web applications, intelligent systems, and cloud-native solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Nissim Zarur" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <GSAPProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
