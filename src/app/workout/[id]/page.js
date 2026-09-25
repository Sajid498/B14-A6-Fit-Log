import { notFound } from "next/navigation";

import WorkoutDetails from "@/components/workout/WorkoutDetails";
import { getWorkoutById } from "@/lib/workouts";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const workout = await getWorkoutById(id);

    if (!workout) {
      return {
        title: "Workout Not Found | FitLog",
      };
    }

    const workoutName =
      workout.name ??
      workout.title ??
      "Workout";

    return {
      title: `${workoutName} | FitLog`,
      description:
        workout.description ??
        `View ${workoutName} workout details on FitLog.`,
    };
  } catch {
    return {
      title: "Workout | FitLog",
    };
  }
}

export default async function WorkoutDetailsPage({
  params,
}) {
  const { id } = await params;

  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
}