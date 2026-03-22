import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Wakin Dev — Portfolio",
  description: "Your description here",
  openGraph: {
    title: "Wakin Dev",
    description: "Your description here",
    url: "https://wakindev.com",
    images: [
      {
        url: "https://wakindev.com/images/me.png", // ← url not img
        width: 1200,
        height: 630,
        alt: "Wakin Dev Portfolio",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
