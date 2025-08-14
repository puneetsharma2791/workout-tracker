export const defaultWorkoutTemplate = {
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

export const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getDayName = (day) => {
  return day.charAt(0).toUpperCase() + day.slice(1);
};