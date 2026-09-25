const BASE_URL =
  "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts() {
  const response = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
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

export async function getWorkoutById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/${id}`,
      {
        cache: "no-store",
      },
    );

    if (response.ok) {
      const result = await response.json();

      if (
        result?.data &&
        !Array.isArray(result.data)
      ) {
        return result.data;
      }

      if (result?.workout) {
        return result.workout;
      }

      if (
        result &&
        typeof result === "object" &&
        !Array.isArray(result)
      ) {
        return result;
      }
    }
  } catch (error) {
    console.error(
      "Single workout API error:",
      error,
    );
  }

  const workouts = await getAllWorkouts();

  const matchedWorkout = workouts.find(
    (workout) => {
      const possibleIds = [
        workout.id,
        workout._id,
        workout.workoutId,
        workout.workout_id,
        workout.slug,
      ];

      return possibleIds.some(
        (value) =>
          value !== undefined &&
          String(value) === String(id),
      );
    },
  );

  if (matchedWorkout) {
    return matchedWorkout;
  }

  const numericId = Number(id);

  if (
    Number.isInteger(numericId) &&
    numericId >= 1 &&
    numericId <= workouts.length
  ) {
    return workouts[numericId - 1];
  }

  return null;
}