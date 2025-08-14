import React from 'react';
import { getDayName } from '../data/workoutTemplate';
import { getWorkoutByDate } from '../utils/localStorage';
import './WorkoutDisplay.css';

const WorkoutDisplay = ({ workoutTemplate, selectedDay, selectedDate, onDateChange, currentUser }) => {
  const todaysWorkout = selectedDay && workoutTemplate[selectedDay] ? workoutTemplate[selectedDay] : [];
  const completedWorkout = getWorkoutByDate(selectedDate, currentUser);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value + 'T00:00:00');
    onDateChange(newDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  if (todaysWorkout.length === 0) {
    return (
      <div className="workout-display">
        <div className="date-selector">
          <label>Select Date: </label>
          <input 
            type="date" 
            value={formatDate(selectedDate)}
            onChange={handleDateChange}
          />
        </div>
        <h2>Rest Day</h2>
        <p>No workout scheduled for {getDayName(selectedDay || '')}. Take a rest!</p>
      </div>
    );
  }

  return (
    <div className="workout-display">
      <div className="date-selector">
        <label>Select Date: </label>
        <input 
          type="date" 
          value={formatDate(selectedDate)}
          onChange={handleDateChange}
        />
      </div>
      
      <h2>{getDayName(selectedDay || '')} Workout</h2>
      
      {completedWorkout && (
        <div className="completion-status">
          ✓ Workout completed on {new Date(completedWorkout.timestamp).toLocaleString()}
        </div>
      )}
      
      <div className="workout-table">
        <div className="table-header">
          <div className="exercise-name">Exercise</div>
          <div className="sets-header" style={{ gridTemplateColumns: `repeat(${Math.max(...todaysWorkout.map(e => e.sets))}, 1fr)` }}>
            {Array.from({ length: Math.max(...todaysWorkout.map(e => e.sets)) }, (_, i) => (
              <div key={i}>Set {i + 1}</div>
            ))}
          </div>
          <div className="target-reps">Target Reps</div>
        </div>
        
        {todaysWorkout.map((exercise, index) => {
          const exerciseData = completedWorkout?.exercises?.find(e => e.name === exercise.name);
          const maxSets = Math.max(...todaysWorkout.map(e => e.sets));
          
          return (
            <div key={index} className="exercise-row">
              <div className="exercise-name">{exercise.name}</div>
              <div className="sets-data" style={{ gridTemplateColumns: `repeat(${maxSets}, 1fr)` }}>
                {Array.from({ length: exercise.sets }, (_, i) => i + 1).map(setNum => {
                  const setData = exerciseData?.sets?.find(s => s.setNumber === setNum);
                  return (
                    <div key={setNum} className="set-info">
                      {setData ? (
                        <>
                          <div className="weight">{setData.weight || '-'} kg</div>
                          <div className="reps">{setData.reps || '-'} reps</div>
                        </>
                      ) : (
                        <div className="empty-set">-</div>
                      )}
                    </div>
                  );
                })}
                {Array.from({ length: maxSets - exercise.sets }, (_, i) => (
                  <div key={`empty-${i}`} className="set-info">
                    <div className="na-set">N/A</div>
                  </div>
                ))}
              </div>
              <div className="target-reps">{exercise.targetReps}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutDisplay;