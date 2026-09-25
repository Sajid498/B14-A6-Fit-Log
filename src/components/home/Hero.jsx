import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow">WORKOUT LIBRARY</p>

          <h1 className="hero-title">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link href="#library" className="primary-button">
            BROWSE WORKOUTS
            <ArrowDownRight size={18} strokeWidth={2.2} />
          </Link>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>

          <Image
            src="/images/banner.png"
            alt="FitLog workout banner"
            width={500}
            height={500}
            className="hero-image"
            priority
          />
        </div>
      </div>
    </section>
  );
}