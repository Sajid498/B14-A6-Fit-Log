export const metadata = {
  title: "My Plan | FitLog",
};

export default function MyPlanPage() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="section-eyebrow">YOUR WORKOUT</p>

        <h1 className="page-title">MY PLAN</h1>

        <p className="page-description">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div className="temporary-library">
          Your workout plan will be built here soon.
        </div>
      </div>
    </section>
  );
}