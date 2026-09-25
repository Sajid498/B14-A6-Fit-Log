"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(
        "fitlog-today-plan",
      );

      const storedSaved = localStorage.getItem(
        "fitlog-saved-workouts",
      );

      if (storedPlan) {
        setTodayPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSavedWorkouts(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error(
        "Failed to load FitLog data:",
        error,
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-today-plan",
      JSON.stringify(todayPlan),
    );
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved-workouts",
      JSON.stringify(savedWorkouts),
    );
  }, [savedWorkouts, isLoaded]);

  function getWorkoutId(workout) {
    return String(
      workout.id ??
        workout._id ??
        workout.workoutId ??
        workout.workout_id ??
        workout.slug ??
        "",
    );
  }

  function isInTodayPlan(workout) {
    const workoutId = getWorkoutId(workout);

    return todayPlan.some(
      (item) => getWorkoutId(item) === workoutId,
    );
  }

  function isSaved(workout) {
    const workoutId = getWorkoutId(workout);

    return savedWorkouts.some(
      (item) => getWorkoutId(item) === workoutId,
    );
  }

  function addToTodayPlan(workout) {
    if (isInTodayPlan(workout)) {
      return {
        success: false,
        message:
          "This workout is already in today's plan.",
      };
    }

    if (todayPlan.length >= 5) {
      return {
        success: false,
        message:
          "Today's plan can contain a maximum of 5 workouts.",
      };
    }

    setTodayPlan((current) => [
      ...current,
      {
        ...workout,
        completed: false,
      },
    ]);

    return {
      success: true,
      message: "Added to today's plan.",
    };
  }

  function saveForLater(workout) {
    if (isSaved(workout)) {
      return {
        success: false,
        message:
          "This workout is already saved.",
      };
    }

    setSavedWorkouts((current) => [
      ...current,
      workout,
    ]);

    return {
      success: true,
      message: "Workout saved for later.",
    };
  }

  function removeFromTodayPlan(workout) {
    const workoutId = getWorkoutId(workout);

    setTodayPlan((current) =>
      current.filter(
        (item) =>
          getWorkoutId(item) !== workoutId,
      ),
    );
  }

  function removeFromSaved(workout) {
    const workoutId = getWorkoutId(workout);

    setSavedWorkouts((current) =>
      current.filter(
        (item) =>
          getWorkoutId(item) !== workoutId,
      ),
    );
  }

  function markAsDone(workout) {
    const workoutId = getWorkoutId(workout);

    setTodayPlan((current) =>
      current.map((item) =>
        getWorkoutId(item) === workoutId
          ? {
              ...item,
              completed: true,
            }
          : item,
      ),
    );
  }

  const value = {
    todayPlan,
    savedWorkouts,
    planCount: todayPlan.length,
    savedCount: savedWorkouts.length,
    isLoaded,
    addToTodayPlan,
    saveForLater,
    removeFromTodayPlan,
    removeFromSaved,
    markAsDone,
    isInTodayPlan,
    isSaved,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkouts must be used inside WorkoutProvider",
    );
  }

  return context;
}