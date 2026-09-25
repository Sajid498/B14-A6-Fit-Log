import WorkoutCard from "./WorkoutCard";
import styles from "./WorkoutCard.module.css";

const API_URL =
  "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts() {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch workout data",
    );
  }

  const result = await response.json();

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (Array.isArray(result?.workouts)) {
    return result.workouts;
  }

  return [];
}

export default async function WorkoutLibrary() {
  try {
    const workouts = await getWorkouts();

    if (!workouts.length) {
      return (
        <div className={styles.errorBox}>
          No workouts are available right now.
        </div>
      );
    }

    return (
      <div className={styles.grid}>
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id ?? workout._id}
            workout={workout}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error(
      "Workout API error:",
      error,
    );

    return (
      <div className={styles.errorBox}>
        Unable to load workouts. Please try
        again.
      </div>
    );
  }
}