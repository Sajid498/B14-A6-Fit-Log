import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="library" className="library-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">WORKOUTS</p>

              <h2>THE LIBRARY</h2>
            </div>

            <p className="section-description">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="temporary-library">
            Workout cards will be added in the next step.
          </div>
        </div>
      </section>
    </>
  );
}