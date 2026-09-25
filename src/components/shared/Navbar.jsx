"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="navbar-wrapper">
      <nav className="navbar container">
        <Link href="/" className="brand">
          <Image
            src="/images/logo.png"
            alt="FitLog Logo"
            width={30}
            height={30}
            priority
          />

          <span>FITLOG</span>
        </Link>

        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${
              workoutActive ? "nav-link-active" : ""
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`nav-link ${
              planActive ? "nav-link-active" : ""
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="nav-badges">
          <Link href="/my-plan" className="plan-badge">
            <span>Plan</span>
            <strong>0</strong>
          </Link>

          <Link href="/my-plan" className="saved-badge">
            <span>Saved</span>
            <strong>0</strong>
          </Link>
        </div>
      </nav>
    </header>
  );
}