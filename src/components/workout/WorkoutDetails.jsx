"use client";

import {
  Bookmark,
  CalendarPlus,
} from "lucide-react";
import { toast } from "react-toastify";

import { useWorkouts } from "@/context/WorkoutContext";
import styles from "./WorkoutDetails.module.css";

function getEquipmentText(equipment) {
  if (Array.isArray(equipment)) {
    return equipment.join(", ");
  }

  return equipment || "Not specified";
}

function getMuscleGroups(workout) {
  if (Array.isArray(workout.muscleGroups)) {
    return workout.muscleGroups;
  }

  if (Array.isArray(workout.tags)) {
    return workout.tags;
  }

  if (workout.category) {
    return [workout.category];
  }

  return [];
}

function formatDuration(duration) {
  if (!duration) {
    return "N/A";
  }

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

export default function WorkoutDetails({ workout }) {
  const {
    addToTodayPlan,
    saveForLater,
    isInTodayPlan,
    isSaved,
  } = useWorkouts();

  const name =
    workout.name ??
    workout.title ??
    "Workout";

  const image =
    workout.image ??
    workout.imageUrl ??
    workout.thumbnail ??
    "";

  const description =
    workout.description ??
    "Build strength, improve technique, and train with intent.";

  const equipment =
    getEquipmentText(workout.equipment);

  const muscleGroups =
    getMuscleGroups(workout);

  const difficulty =
    workout.difficulty ??
    "Not specified";

  const sets =
    workout.sets ??
    "N/A";

  const reps =
    workout.reps ??
    "N/A";

  const duration =
    workout.duration ??
    workout.durationMinutes;

  const calories =
    workout.caloriesBurned ??
    workout.calories ??
    workout.kcal;

  const rating =
    workout.rating ??
    "N/A";

  const instructions =
    Array.isArray(workout.instructions)
      ? workout.instructions
      : [];

  const alreadyInPlan =
    isInTodayPlan(workout);

  const alreadySaved =
    isSaved(workout);

  function handleAddToPlan() {
    const result =
      addToTodayPlan(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.info(result.message);
    }
  }

  function handleSaveForLater() {
    const result =
      saveForLater(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.info(result.message);
    }
  }

  return (
    <section className={styles.detailsSection}>
      <div className="container">
        <div className={styles.detailsGrid}>
          <div className={styles.visualColumn}>
            <div className={styles.imageWrapper}>
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className={styles.workoutImage}
                />
              ) : (
                <div
                  className={
                    styles.imageFallback
                  }
                >
                  FITLOG
                </div>
              )}
            </div>
          </div>

          <div className={styles.contentColumn}>
            <h1 className={styles.title}>
              {name}
            </h1>

            <p className={styles.description}>
              {description}
            </p>

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

            <section className={styles.panel}>
              <div className={styles.specRow}>
                <span>EQUIPMENT</span>
                <strong>{equipment}</strong>
              </div>

              <div className={styles.specRow}>
                <span>DIFFICULTY</span>
                <strong>{difficulty}</strong>
              </div>

              <div className={styles.specRow}>
                <span>SETS</span>
                <strong>{sets}</strong>
              </div>

              <div className={styles.specRow}>
                <span>REPS</span>
                <strong>{reps}</strong>
              </div>

              <div className={styles.specRow}>
                <span>DURATION</span>
                <strong>
                  {formatDuration(duration)}
                </strong>
              </div>

              <div className={styles.specRow}>
                <span>CALORIES</span>
                <strong>
                  {formatCalories(calories)}
                </strong>
              </div>

              <div className={styles.specRow}>
                <span>RATING</span>
                <strong>{rating}</strong>
              </div>
            </section>

            <section
              className={
                styles.instructionsSection
              }
            >
              <h2>INSTRUCTIONS</h2>

              {instructions.length > 0 ? (
                <ol
                  className={
                    styles.instructions
                  }
                >
                  {instructions.map(
                    (instruction, index) => (
                      <li
                        key={`${index}-${instruction}`}
                        className={
                          styles.instruction
                        }
                      >
                        <span
                          className={
                            styles.instructionNumber
                          }
                        >
                          {index + 1}.
                        </span>

                        <p>
                          {instruction}
                        </p>
                      </li>
                    ),
                  )}
                </ol>
              ) : (
                <p
                  className={
                    styles.noInstructions
                  }
                >
                  No instructions available for
                  this workout.
                </p>
              )}
            </section>

            <div className={styles.actions}>
              <button
                type="button"
                className={
                  styles.primaryButton
                }
                onClick={handleAddToPlan}
              >
                <CalendarPlus size={16} />

                <span>
                  {alreadyInPlan
                    ? "IN TODAY'S PLAN"
                    : "ADD TO TODAY'S PLAN"}
                </span>
              </button>

              <button
                type="button"
                className={
                  styles.secondaryButton
                }
                onClick={handleSaveForLater}
              >
                <Bookmark size={16} />

                <span>
                  {alreadySaved
                    ? "SAVED"
                    : "SAVE FOR LATER"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}