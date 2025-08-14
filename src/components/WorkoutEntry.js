import React, { useState, useEffect } from 'react';
import { getDayName } from '../data/workoutTemplate';
import { saveWorkoutEntry, getWorkoutByDate, getPreviousWeekWorkout, getLastWorkoutForExercise } from '../utils/localStorage';
import './WorkoutEntry.css';

const WorkoutEntry = ({ workoutTemplate, selectedDay, selectedDate, onDateChange, currentUser }) => {
  const [workoutData, setWorkoutData] = useState([]);
  const [previousWeekData, setPreviousWeekData] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (selectedDay && workoutTemplate[selectedDay]) {
      const existingWorkout = getWorkoutByDate(selectedDate, currentUser);
      const previousWeek = getPreviousWeekWorkout(selectedDate, selectedDay, currentUser);
      
      setPreviousWeekData(previousWeek);
      
      if (existingWorkout) {
        setWorkoutData(existingWorkout.exercises || []);
      } else {
        const initialData = workoutTemplate[selectedDay].map(exercise => ({
          name: exercise.name,
          targetReps: exercise.targetReps,
          sets: [
            { setNumber: 1, weight: '', reps: '' },
            { setNumber: 2, weight: '', reps: '' },
            { setNumber: 3, weight: '', reps: '' },
            { setNumber: 4, weight: '', reps: '' }
          ]
        }));
        setWorkoutData(initialData);
      }
    }
  }, [selectedDay, selectedDate, workoutTemplate, currentUser]);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value + 'T00:00:00');
    onDateChange(newDate);
    setSaveStatus('');
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const newData = [...workoutData];
    newData[exerciseIndex].sets[setIndex][field] = value;
    setWorkoutData(newData);
    setSaveStatus('');
  };

  const handleSave = () => {
    saveWorkoutEntry(selectedDate, selectedDay, workoutData, currentUser);
    setSaveStatus('Workout saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getPreviousWeekValue = (exerciseName, setNumber, field) => {
    if (!previousWeekData || !previousWeekData.exercises) return null;
    const exercise = previousWeekData.exercises.find(e => e.name === exerciseName);
    if (!exercise || !exercise.sets) return null;
    const set = exercise.sets.find(s => s.setNumber === setNumber);
    return set ? set[field] : null;
  };

  if (selectedDay === 'sunday') {
    return (
      <div className="workout-entry">
        <div className="date-selector">
          <label>Select Date: </label>
          <input 
            type="date" 
            value={formatDate(selectedDate)}
            onChange={handleDateChange}
          />
        </div>
        <h2>Rest Day</h2>
        <p>No workout scheduled for Sunday. Take a rest!</p>
      </div>
    );
  }

  return (
    <div className="workout-entry">
      <div className="date-selector">
        <label>Select Date: </label>
        <input 
          type="date" 
          value={formatDate(selectedDate)}
          onChange={handleDateChange}
        />
      </div>
      
      <h2>Log {getDayName(selectedDay || '')} Workout</h2>
      
      {previousWeekData && (
        <div className="previous-week-notice">
          Previous week's data shown in gray for reference
        </div>
      )}
      
      <div className="entry-form">
        {workoutData.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="exercise-entry">
            <h3>{exercise.name}</h3>
            <div className="target-reps">Target: {exercise.targetReps}</div>
            {getLastWorkoutForExercise(exercise.name, selectedDate, currentUser) && (
              <div className="last-workout-summary">
                <strong>Last workout ({getLastWorkoutForExercise(exercise.name, selectedDate, currentUser).date}):</strong>
                {getLastWorkoutForExercise(exercise.name, selectedDate, currentUser).sets.map((s, idx) => (
                  <span key={idx} className="last-set">
                    Set {s.setNumber}: {s.weight}kg × {s.reps} reps
                  </span>
                ))}
              </div>
            )}
            
            <div className="sets-entry">
              {exercise.sets.map((set, setIndex) => {
                const prevWeight = getPreviousWeekValue(exercise.name, set.setNumber, 'weight');
                const prevReps = getPreviousWeekValue(exercise.name, set.setNumber, 'reps');
                
                return (
                  <div key={setIndex} className="set-entry">
                    <div className="set-label">Set {set.setNumber}</div>
                    <div className="input-group">
                      <div className="input-wrapper">
                        <input
                          type="number"
                          placeholder="Weight (kg)"
                          value={set.weight}
                          onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                          className="weight-input"
                          step="0.5"
                        />
                        {prevWeight && (
                          <div className="previous-value">Last: {prevWeight} kg</div>
                        )}
                      </div>
                      <div className="input-wrapper">
                        <input
                          type="number"
                          placeholder="Reps"
                          value={set.reps}
                          onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                          className="reps-input"
                        />
                        {prevReps && (
                          <div className="previous-value">Last: {prevReps} reps</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="save-section">
        <button onClick={handleSave} className="save-button">
          Save Workout
        </button>
        {saveStatus && (
          <div className="save-status">{saveStatus}</div>
        )}
      </div>
    </div>
  );
};

export default WorkoutEntry;