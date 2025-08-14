export const puneetWorkoutTemplate = {
  monday: [
    { name: "Lat pull down - close grip", sets: 4, targetReps: "10-12" },
    { name: "Upper pec flyes - cable", sets: 4, targetReps: "15" },
    { name: "Spinal Erector Cable Rows", sets: 4, targetReps: "8-10" },
    { name: "Decline/flat DB flyes", sets: 4, targetReps: "15" },
    { name: "Lateral raises - machine", sets: 4, targetReps: "10-12" },
    { name: "Cable crunches", sets: 4, targetReps: "15-20" }
  ],
  tuesday: [
    { name: "Leg Curls", sets: 4, targetReps: "12" },
    { name: "Squats", sets: 4, targetReps: "8-10" },
    { name: "Leg extensions - machine", sets: 4, targetReps: "10-15" },
    { name: "Glute-ham raises", sets: 4, targetReps: "10-15" },
    { name: "Calf raises - leg press machine", sets: 4, targetReps: "15-20" },
    { name: "triceps pushdown (bar, no lockout, full stretch)", sets: 4, targetReps: "12 (with weight you can do 20 reps with)" }
  ],
  wednesday: [
    { name: "Underhand Pullups", sets: 4, targetReps: "10-12" },
    { name: "Machine chest flyes", sets: 4, targetReps: "15" },
    { name: "DB rows", sets: 4, targetReps: "10-12" },
    { name: "Cable cross over - pecs", sets: 4, targetReps: "15" },
    { name: "Cable upright rows", sets: 4, targetReps: "12-15" },
    { name: "Leg raises", sets: 4, targetReps: "till failure" }
  ],
  thursday: [
    { name: "Leg curls (very light, only for warmup)", sets: 4, targetReps: "10" },
    { name: "Leg press", sets: 4, targetReps: "8-10" },
    { name: "SLDL", sets: 4, targetReps: "8-10" },
    { name: "Smith machine/DB lunges", sets: 4, targetReps: "12-20" },
    { name: "Smith machine/DB calf press", sets: 4, targetReps: "15-20" },
    { name: "Single arm cable extension (no lockout, full stretch)", sets: 4, targetReps: "10-12 (with weight you can do 20 reps with)" }
  ],
  friday: [
    { name: "Machine rows", sets: 4, targetReps: "8-10" },
    { name: "Upper pec flyes - DB", sets: 4, targetReps: "15" },
    { name: "Cable Y raises", sets: 4, targetReps: "12-15" },
    { name: "Face pulls", sets: 4, targetReps: "10-12" },
    { name: "Shrugs - barbell", sets: 4, targetReps: "8-10" },
    { name: "Ab Crunch - cross body", sets: 4, targetReps: "till failure" }
  ],
  saturday: [
    { name: "Standard deadlift", sets: 4, targetReps: "6-8" },
    { name: "Leg curls", sets: 4, targetReps: "8-10 (heavier weight)" },
    { name: "Lunges", sets: 4, targetReps: "12-20" },
    { name: "Calf raises - leg press or DB", sets: 4, targetReps: "15-20" }
  ]
};

export const vinayWorkoutTemplate = {
  monday: [], // Rest day
  tuesday: [
    // Lower Body (Workout A)
    { name: "Goblet Squats", sets: 3, targetReps: "12" },
    { name: "Walking Lunges", sets: 3, targetReps: "10 each leg" },
    { name: "Romanian Deadlifts", sets: 3, targetReps: "12" },
    { name: "Step-ups (low platform)", sets: 3, targetReps: "10 each leg" },
    { name: "Standing Calf Raises", sets: 3, targetReps: "15" }
  ],
  wednesday: [
    // Cardio
    { name: "Treadmill Intervals (2 min jog + 1 min walk)", sets: 1, targetReps: "10 rounds" },
    { name: "OR Stationary Bike Intervals (1 min fast/1 min slow)", sets: 1, targetReps: "10 rounds" },
    { name: "OR Rowing Machine (500m row + 1 min rest)", sets: 1, targetReps: "6 rounds" }
  ],
  thursday: [
    // Upper Body
    { name: "Dumbbell Chest Press", sets: 3, targetReps: "10" },
    { name: "Lat Pulldown", sets: 3, targetReps: "12" },
    { name: "Dumbbell Shoulder Press", sets: 3, targetReps: "10" },
    { name: "Seated Cable Row", sets: 3, targetReps: "12" },
    { name: "Bicep Curls", sets: 3, targetReps: "12" },
    { name: "Tricep Rope Pushdown", sets: 3, targetReps: "12" }
  ],
  friday: [
    // Cardio
    { name: "Treadmill Incline Walk", sets: 1, targetReps: "30 mins" },
    { name: "OR Elliptical", sets: 1, targetReps: "25 mins" },
    { name: "OR Outdoor Brisk Walk", sets: 1, targetReps: "40 mins" }
  ],
  saturday: [
    // Lower Body (Workout B - Machines)
    { name: "Leg Press Machine", sets: 3, targetReps: "12" },
    { name: "Leg Curl Machine", sets: 3, targetReps: "12" },
    { name: "Leg Extension Machine", sets: 3, targetReps: "12" },
    { name: "Glute Kickback Machine", sets: 3, targetReps: "12 each leg" },
    { name: "Standing Calf Raises", sets: 3, targetReps: "15" }
  ],
  sunday: [
    // Upper Body (Different Focus)
    { name: "Incline Dumbbell Press", sets: 3, targetReps: "10" },
    { name: "Cable Lat Row", sets: 3, targetReps: "12" },
    { name: "Arnold Press", sets: 3, targetReps: "10" },
    { name: "Rear Delt Fly", sets: 3, targetReps: "12" },
    { name: "Hammer Curls", sets: 3, targetReps: "12" },
    { name: "Overhead Tricep Extension", sets: 3, targetReps: "12" }
  ]
};

export const getDefaultTemplateForUser = (user) => {
  if (user === 'vinay') {
    return vinayWorkoutTemplate;
  }
  return puneetWorkoutTemplate;
};

export const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const getDayName = (day) => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};