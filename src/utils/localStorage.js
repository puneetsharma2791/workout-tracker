const STORAGE_KEYS = {
  WORKOUT_HISTORY: 'workoutHistory',
  WORKOUT_TEMPLATE: 'workoutTemplate'
};

export const saveWorkoutEntry = (date, dayOfWeek, workoutData) => {
  const history = getWorkoutHistory();
  const dateKey = date.toISOString().split('T')[0];
  
  if (!history[dateKey]) {
    history[dateKey] = {};
  }
  
  history[dateKey] = {
    dayOfWeek,
    exercises: workoutData,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history));
  return history;
};

export const getWorkoutHistory = () => {
  const history = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
  return history ? JSON.parse(history) : {};
};

export const getWorkoutByDate = (date) => {
  const history = getWorkoutHistory();
  const dateKey = date.toISOString().split('T')[0];
  return history[dateKey] || null;
};

export const getPreviousWeekWorkout = (currentDate, dayOfWeek) => {
  const previousWeek = new Date(currentDate);
  previousWeek.setDate(previousWeek.getDate() - 7);
  
  const history = getWorkoutHistory();
  const dateKey = previousWeek.toISOString().split('T')[0];
  
  return history[dateKey] || null;
};

export const saveWorkoutTemplate = (template) => {
  localStorage.setItem(STORAGE_KEYS.WORKOUT_TEMPLATE, JSON.stringify(template));
  return template;
};

export const getWorkoutTemplate = () => {
  const template = localStorage.getItem(STORAGE_KEYS.WORKOUT_TEMPLATE);
  return template ? JSON.parse(template) : null;
};

export const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};