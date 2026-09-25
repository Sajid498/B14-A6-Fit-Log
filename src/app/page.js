import { Suspense } from "react";

import Hero from "@/components/home/Hero";
import WorkoutLibrary from "@/components/home/WorkoutLibrary";
import WorkoutLoading from "@/components/home/WorkoutLoading";

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="library"
        className="library-section"
      >
        <div className="container">
          <div className="section-heading">
            <h2>THE LIBRARY</h2>

            <p className="section-description">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <Suspense fallback={<WorkoutLoading />}>
            <WorkoutLibrary />
          </Suspense>
        </div>
      </section>
    </>
  );
}