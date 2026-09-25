import styles from "./loading.module.css";

export default function Loading() {
  return (
    <section className={styles.loadingPage}>
      <div className={styles.loadingContent}>
        <div className={styles.loader}>
          <div className={styles.ring} />
          <div className={styles.innerRing} />
        </div>

        <h2 className={styles.title}>
          LOADING FITLOG
        </h2>

        <p className={styles.text}>
          Loading workouts
          <span className={styles.dots} />
        </p>
      </div>
    </section>
  );
}