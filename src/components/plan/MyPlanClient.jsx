"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Clock3,
  Dumbbell,
  Flame,
  ListChecks,
  Star,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import { useWorkouts } from "@/context/WorkoutContext";
import styles from "./MyPlan.module.css";

function getWorkoutId(workout, index = 0) {
  return (
    workout.id ??
    workout._id ??
    workout.workoutId ??
    workout.workout_id ??
    workout.slug ??
    index + 1
  );
}

function getWorkoutName(workout) {
  return workout.name ?? workout.title ?? "Workout";
}

function getWorkoutImage(workout) {
  return (
    workout.image ??
    workout.imageUrl ??
    workout.thumbnail ??
    ""
  );
}

function getEquipment(workout) {
  if (Array.isArray(workout.equipment)) {
    return workout.equipment.join(", ");
  }

  return workout.equipment ?? "No equipment";
}

function getTags(workout) {
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

function getDurationNumber(workout) {
  const value =
    workout.duration ??
    workout.durationMinutes ??
    0;

  if (typeof value === "number") {
    return value;
  }

  const parsed = parseFloat(value);

  return Number.isNaN(parsed) ? 0 : parsed;
}

function getCaloriesNumber(workout) {
  const value =
    workout.caloriesBurned ??
    workout.calories ??
    workout.kcal ??
    0;

  if (typeof value === "number") {
    return value;
  }

  const parsed = parseFloat(value);

  return Number.isNaN(parsed) ? 0 : parsed;
}

function getRatingNumber(workout) {
  const value = workout.rating ?? 0;

  if (typeof value === "number") {
    return value;
  }

  const parsed = parseFloat(value);

  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDuration(workout) {
  const duration =
    workout.duration ??
    workout.durationMinutes;

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

function formatCalories(workout) {
  const calories =
    workout.caloriesBurned ??
    workout.calories ??
    workout.kcal;

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

export default function MyPlanClient() {
  const {
    todayPlan,
    savedWorkouts,
    isLoaded,
    removeFromTodayPlan,
    removeFromSaved,
    markAsDone,
  } = useWorkouts();

  const [activeTab, setActiveTab] =
    useState("plan");

  const [sortBy, setSortBy] =
    useState("duration");

  const currentList =
    activeTab === "plan"
      ? todayPlan
      : savedWorkouts;

  const sortedWorkouts = useMemo(() => {
    const workouts = [...currentList];

    if (sortBy === "duration") {
      return workouts.sort(
        (a, b) =>
          getDurationNumber(a) -
          getDurationNumber(b),
      );
    }

    if (sortBy === "calories") {
      return workouts.sort(
        (a, b) =>
          getCaloriesNumber(a) -
          getCaloriesNumber(b),
      );
    }

    if (sortBy === "rating") {
      return workouts.sort(
        (a, b) =>
          getRatingNumber(b) -
          getRatingNumber(a),
      );
    }

    return workouts;
  }, [currentList, sortBy]);

  const totalExercises = todayPlan.length;

  const totalMinutes = todayPlan.reduce(
    (total, workout) =>
      total + getDurationNumber(workout),
    0,
  );

  const totalCalories = todayPlan.reduce(
    (total, workout) =>
      total + getCaloriesNumber(workout),
    0,
  );

  function handleMarkDone(workout) {
    if (workout.completed) {
      toast.info(
        "This workout is already marked as done.",
      );
      return;
    }

    markAsDone(workout);

    toast.success("Workout marked as done.");
  }

  function handleRemove(workout) {
    if (activeTab === "plan") {
      removeFromTodayPlan(workout);

      toast.success(
        "Workout removed from today's plan.",
      );

      return;
    }

    removeFromSaved(workout);

    toast.success(
      "Workout removed from saved list.",
    );
  }

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        Loading workouts…
      </div>
    );
  }

  return (
    <>
      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>
              Exercises
            </span>

            <Dumbbell
              size={20}
              className={styles.metricIcon}
            />
          </div>

          <p className={styles.metricValue}>
            {totalExercises}
          </p>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>
              Minutes
            </span>

            <Clock3
              size={20}
              className={styles.metricIcon}
            />
          </div>

          <p className={styles.metricValue}>
            {totalMinutes}
          </p>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>
              Calories
            </span>

            <Flame
              size={20}
              className={styles.metricIcon}
            />
          </div>

          <p className={styles.metricValue}>
            {totalCalories}
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "plan"
                ? styles.activeTab
                : ""
            }`}
            onClick={() =>
              setActiveTab("plan")
            }
          >
            Today&apos;s Plan ({todayPlan.length})
          </button>

          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === "saved"
                ? styles.activeTab
                : ""
            }`}
            onClick={() =>
              setActiveTab("saved")
            }
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        <div className={styles.sortWrapper}>
          <span className={styles.sortLabel}>
            Sort By
          </span>

          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <ChevronDown
              size={16}
              className={styles.chevron}
            />
          </div>
        </div>
      </div>

      {sortedWorkouts.length === 0 ? (
        <div className={styles.empty}>
          <ListChecks
            size={42}
            className={styles.emptyIcon}
          />

          <h2 className={styles.emptyTitle}>
            NOTHING HERE YET
          </h2>

          <p className={styles.emptyText}>
            Browse the library and add a lift
            to get today moving.
          </p>

          <Link
            href="/"
            className={styles.emptyButton}
          >
            GO TO WORKOUTS
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {sortedWorkouts.map(
            (workout, index) => {
              const workoutId =
                getWorkoutId(
                  workout,
                  index,
                );

              const name =
                getWorkoutName(workout);

              const image =
                getWorkoutImage(workout);

              const equipment =
                getEquipment(workout);

              const tags =
                getTags(workout);

              return (
                <article
                  key={`${workoutId}-${index}`}
                  className={`${styles.card} ${
                    workout.completed
                      ? styles.doneCard
                      : ""
                  }`}
                >
                  <div
                    className={
                      styles.thumbnailWrapper
                    }
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className={
                          styles.thumbnail
                        }
                      />
                    ) : (
                      <div
                        className={
                          styles.thumbnailFallback
                        }
                      >
                        FITLOG
                      </div>
                    )}
                  </div>

                  <div
                    className={
                      styles.cardContent
                    }
                  >
                    <div
                      className={
                        styles.statusRow
                      }
                    >
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className={
                            styles.tag
                          }
                        >
                          {tag}
                        </span>
                      ))}

                      {workout.completed && (
                        <span
                          className={
                            styles.doneTag
                          }
                        >
                          DONE
                        </span>
                      )}
                    </div>

                    <h3
                      className={
                        styles.cardTitle
                      }
                    >
                      {name}
                    </h3>

                    <p
                      className={
                        styles.equipment
                      }
                    >
                      {equipment}
                    </p>

                    <div
                      className={
                        styles.stats
                      }
                    >
                      <span
                        className={
                          styles.stat
                        }
                      >
                        <Clock3 size={15} />

                        {formatDuration(
                          workout,
                        )}
                      </span>

                      <span
                        className={
                          styles.stat
                        }
                      >
                        <Flame size={15} />

                        {formatCalories(
                          workout,
                        )}
                      </span>

                      <span
                        className={
                          styles.stat
                        }
                      >
                        <Star size={15} />

                        {getRatingNumber(
                          workout,
                        )}
                      </span>
                    </div>
                  </div>

                  <div
                    className={styles.actions}
                  >
                    <Link
                      href={`/workout/${workoutId}`}
                      className={
                        styles.detailsButton
                      }
                    >
                      VIEW DETAILS
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        type="button"
                        className={
                          styles.doneButton
                        }
                        onClick={() =>
                          handleMarkDone(
                            workout,
                          )
                        }
                        disabled={
                          workout.completed
                        }
                      >
                        <Check size={15} />

                        {workout.completed
                          ? "DONE"
                          : "MARK AS DONE"}
                      </button>
                    )}

                    <button
                      type="button"
                      className={
                        styles.removeButton
                      }
                      onClick={() =>
                        handleRemove(
                          workout,
                        )
                      }
                      aria-label={`Remove ${name}`}
                      title="Remove workout"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </article>
              );
            },
          )}
        </div>
      )}
    </>
  );
}