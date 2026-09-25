# FitLog

FitLog is a responsive workout library and personal workout planning web application. It allows users to browse exercises, view detailed workout information, create a daily workout plan, save workouts for later, and track completed exercises.

## Project Description

FitLog is designed as a simple, dark-themed gym companion for users who want to train with intention and organize their workouts efficiently.

Users can explore a workout library fetched from an external API, open individual workout details, add workouts to today's plan, save workouts for later, mark exercises as completed, remove workouts, and sort their workout lists.

Workout plan and saved workout data are stored in localStorage so that the user's data remains available after refreshing the browser.

## Technologies Used

- Next.js 16
- React
- JavaScript
- Tailwind CSS
- CSS Modules
- Lucide React
- React Toastify
- REST API
- LocalStorage
- Git & GitHub
- Vercel

## API

All Workouts:

https://api.abcz.workers.dev/api/fitlog

Single Workout:

https://api.abcz.workers.dev/api/fitlog/:id

## Main Features

1. Responsive workout library for desktop, tablet, and mobile devices.

2. Workout data is dynamically loaded from the FitLog API.

3. Each workout has a dedicated details page containing workout information, equipment, difficulty, sets, reps, duration, calories, rating, and instructions.

4. Users can add workouts to Today's Plan.

5. Users can save workouts for later.

6. Navbar counters automatically display the number of planned and saved workouts.

7. Workout plan and saved workout information are stored using localStorage and remain available after page refresh.

8. Today's workout plan is limited to a maximum of five exercises.

9. Duplicate workouts cannot be added repeatedly to the same list.

10. My Plan page displays total exercises, workout minutes, and estimated calories.

11. Users can switch between Today's Plan and Saved Workouts.

12. Workouts can be sorted by Duration, Calories, or Rating.

13. Users can mark workouts as completed.

14. Users can remove workouts from Today's Plan or Saved Workouts.

15. Toast notifications provide feedback for important user actions.

16. Custom loading interface is displayed while content is loading.

17. Custom 404 page handles unknown or invalid routes.

18. Custom error handling provides a friendly fallback if something goes wrong.

## Pages

### Home

The Home page contains:

- Navbar
- Hero section
- Browse Workouts button
- Workout Library
- Workout cards
- Footer

### Workout Details

The Workout Details page contains:

- Workout image
- Workout name
- Description
- Muscle group tags
- Equipment
- Difficulty
- Sets
- Reps
- Duration
- Calories
- Rating
- Instructions
- Add to Today's Plan button
- Save for Later button

### My Plan

The My Plan page contains:

- Total Exercises
- Total Minutes
- Total Calories
- Today's Plan tab
- Saved tab
- Sorting options
- Workout information
- View Details button
- Mark as Done button
- Remove button
- Empty state

## Sorting Options

Users can sort workouts using:

- Duration
- Calories
- Rating

The default sorting option is Duration.

## LocalStorage

FitLog uses localStorage to store:

- Today's workout plan
- Saved workouts
- Completed workout state

This allows workout data to remain available after refreshing the browser.

## Responsive Design

FitLog is designed to work across:

- Desktop
- Tablet
- Mobile


