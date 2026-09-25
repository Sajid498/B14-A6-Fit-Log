import Link from "next/link";
import { Dumbbell, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="container not-found-container">
        <Dumbbell
          size={50}
          className="not-found-icon"
        />

        <p className="not-found-code">
          404
        </p>

        <h1 className="not-found-title">
          PAGE NOT FOUND
        </h1>

        <p className="not-found-text">
          The page or workout you are looking for
          does not exist.
        </p>

        <Link
          href="/"
          className="not-found-button"
        >
          <MoveLeft size={17} />
          BACK TO WORKOUTS
        </Link>
      </div>
    </section>
  );
}