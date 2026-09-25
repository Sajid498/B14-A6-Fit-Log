import { Inter, Oswald } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";

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
        <WorkoutProvider>
          <div className="site-wrapper">
            <Navbar />

            <main className="site-main">
              {children}
            </main>

            <Footer />
          </div>

          <ToastContainer
            position="top-right"
            autoClose={2200}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}