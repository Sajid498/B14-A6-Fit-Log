import styles from "./WorkoutCard.module.css";

export default function WorkoutLoading() {
  return (
    <div>
      <p className={styles.loadingMessage}>
        Loading workouts…
      </p>

      <div className={styles.loadingGrid}>
        {Array.from({ length: 12 }).map(
          (_, index) => (
            <div
              key={index}
              className={styles.loadingCard}
            >
              <div
                className={styles.loadingImage}
              />

              <div
                className={styles.loadingContent}
              >
                <div
                  className={
                    styles.loadingLineLarge
                  }
                />

                <div
                  className={
                    styles.loadingLineMedium
                  }
                />

                <div
                  className={
                    styles.loadingLineSmall
                  }
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}