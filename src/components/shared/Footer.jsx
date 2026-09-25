import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <Link href="/" className="footer-brand">
          <Image
            src="/images/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
          />

          <span>FITLOG</span>
        </Link>

        <p className="footer-copy">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}