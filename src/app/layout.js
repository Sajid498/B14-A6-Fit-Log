import { Inter, Oswald } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "FitLog | Workout Library",
  description:
    "Train with intent, build your workout plan, and log every set with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <div className="site-wrapper">
          <Navbar />

          <main className="site-main">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}