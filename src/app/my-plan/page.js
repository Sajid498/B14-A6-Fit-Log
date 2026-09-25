import MyPlanClient from "@/components/plan/MyPlanClient";
import styles from "@/components/plan/MyPlan.module.css";

export const metadata = {
  title: "My Plan | FitLog",
  description:
    "Manage today's workout plan and saved exercises in FitLog.",
};

export default function MyPlanPage() {
  return (
    <section className={styles.planSection}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>
            MY PLAN
          </h1>

          <p className={styles.subtitle}>
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <MyPlanClient />
      </div>
    </section>
  );
}