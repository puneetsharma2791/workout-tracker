const STORAGE_KEYS = {
  WORKOUT_HISTORY: 'workoutHistory',
  WORKOUT_TEMPLATE: 'workoutTemplate'
};

const getUserKey = (baseKey, user) => {
  return user ? `${baseKey}_${user.toLowerCase()}` : baseKey;
};

export const saveWorkoutEntry = (date, dayOfWeek, workoutData, user = 'default') => {
  const history = getWorkoutHistory(user);
  const dateKey = date.toISOString().split('T')[0];
  
  if (!history[dateKey]) {
    history[dateKey] = {};
  }
  
  history[dateKey] = {
    dayOfWeek,
    exercises: workoutData,
    timestamp: new Date().toISOString(),
    user
  };
  
  localStorage.setItem(getUserKey(STORAGE_KEYS.WORKOUT_HISTORY, user), JSON.stringify(history));
  return history;
};

export const getWorkoutHistory = (user = 'default') => {
  const history = localStorage.getItem(getUserKey(STORAGE_KEYS.WORKOUT_HISTORY, user));
  return history ? JSON.parse(history) : {};
};

export const getWorkoutByDate = (date, user = 'default') => {
  const history = getWorkoutHistory(user);
  const dateKey = date.toISOString().split('T')[0];
  return history[dateKey] || null;
};

export const getPreviousWeekWorkout = (currentDate, dayOfWeek, user = 'default') => {
  const previousWeek = new Date(currentDate);
  previousWeek.setDate(previousWeek.getDate() - 7);
  
  const history = getWorkoutHistory(user);
  const dateKey = previousWeek.toISOString().split('T')[0];
  
  return history[dateKey] || null;
};

export const getLastWorkoutForExercise = (exerciseName, currentDate, user = 'default') => {
  const history = getWorkoutHistory(user);
  const currentDateKey = currentDate.toISOString().split('T')[0];
  
  let lastWorkout = null;
  let lastDate = null;
  
  Object.keys(history).forEach(dateKey => {
    if (dateKey < currentDateKey) {
      const workout = history[dateKey];
      if (workout.exercises) {
        const exercise = workout.exercises.find(e => e.name === exerciseName);
        if (exercise && (!lastDate || dateKey > lastDate)) {
          lastWorkout = exercise;
          lastDate = dateKey;
        }
      }
    }
  });
  
  return lastWorkout ? { ...lastWorkout, date: lastDate } : null;
};

export const saveWorkoutTemplate = (template, user = 'default') => {
  localStorage.setItem(getUserKey(STORAGE_KEYS.WORKOUT_TEMPLATE, user), JSON.stringify(template));
  return template;
};

export const getWorkoutTemplate = (user = 'default') => {
  // First check for user-specific template
  const userSpecificKey = getUserKey(STORAGE_KEYS.WORKOUT_TEMPLATE, user);
  const template = localStorage.getItem(userSpecificKey);
  
  // If no user-specific template exists, check for legacy template
  if (!template && user === 'puneet') {
    // Check if there's an old template without user suffix
    const legacyTemplate = localStorage.getItem(STORAGE_KEYS.WORKOUT_TEMPLATE);
    if (legacyTemplate) {
      // Migrate the legacy template to user-specific key
      localStorage.setItem(userSpecificKey, legacyTemplate);
      // Remove the old key to avoid confusion
      localStorage.removeItem(STORAGE_KEYS.WORKOUT_TEMPLATE);
      return JSON.parse(legacyTemplate);
    }
  }
  
  return template ? JSON.parse(template) : null;
};

// Helper function to clear a user's template if needed
export const clearUserTemplate = (user) => {
  const userSpecificKey = getUserKey(STORAGE_KEYS.WORKOUT_TEMPLATE, user);
  localStorage.removeItem(userSpecificKey);
};

export const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};