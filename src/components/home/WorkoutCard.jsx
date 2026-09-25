import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import styles from "./WorkoutCard.module.css";

function formatDuration(duration) {
  if (!duration) return "N/A";

  if (typeof duration === "number") {
    return `${duration} min`;
  }

  return String(duration)
    .toLowerCase()
    .includes("min")
    ? duration
    : `${duration} min`;
}

function formatCalories(calories) {
  if (
    calories === undefined ||
    calories === null
  ) {
    return "N/A";
  }

  if (
    typeof calories === "string" &&
    calories.toLowerCase().includes("kcal")
  ) {
    return calories;
  }

  return `${calories} kcal`;
}

export default function WorkoutCard({
  workout,
  index,
}) {
  const workoutId =
    workout.id ??
    workout._id ??
    workout.workoutId ??
    workout.workout_id ??
    workout.slug ??
    index + 1;

  const workoutName =
    workout.name ??
    workout.title ??
    "Workout";

  const workoutImage =
    workout.image ??
    workout.imageUrl ??
    workout.thumbnail ??
    "";

  const muscleGroups = Array.isArray(
    workout.muscleGroups,
  )
    ? workout.muscleGroups
    : Array.isArray(workout.tags)
      ? workout.tags
      : workout.category
        ? [workout.category]
        : [];

  const equipment = Array.isArray(
    workout.equipment,
  )
    ? workout.equipment.join(", ")
    : workout.equipment ?? "No equipment";

  const duration =
    workout.duration ??
    workout.durationMinutes;

  const calories =
    workout.caloriesBurned ??
    workout.calories ??
    workout.kcal;

  const rating = workout.rating ?? "N/A";

  return (
    <Link
      href={`/workout/${workoutId}`}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        {workoutImage ? (
          <img
            src={workoutImage}
            alt={workoutName}
            className={styles.image}
          />
        ) : (
          <div className={styles.imageFallback}>
            FITLOG
          </div>
        )}

        <div className={styles.tags}>
          {muscleGroups.map((group) => (
            <span
              key={group}
              className={styles.tag}
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {workoutName}
        </h3>

        <p className={styles.equipment}>
          {equipment}
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <Clock3 size={16} />
            <span>
              {formatDuration(duration)}
            </span>
          </div>

          <div className={styles.stat}>
            <Flame size={16} />
            <span>
              {formatCalories(calories)}
            </span>
          </div>

          <div className={styles.stat}>
            <Star size={16} />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}