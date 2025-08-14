import React from 'react';
import { getDayName } from '../data/workoutTemplate';
import { getWorkoutByDate } from '../utils/localStorage';
import './WorkoutDisplay.css';

const WorkoutDisplay = ({ workoutTemplate, selectedDay, selectedDate, onDateChange }) => {
  const todaysWorkout = selectedDay && workoutTemplate[selectedDay] ? workoutTemplate[selectedDay] : [];
  const completedWorkout = getWorkoutByDate(selectedDate);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value + 'T00:00:00');
    onDateChange(newDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  if (selectedDay === 'sunday') {
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
        <p>No workout scheduled for Sunday. Take a rest!</p>
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
          <div className="sets-header">
            <div>Set 1</div>
            <div>Set 2</div>
            <div>Set 3</div>
            <div>Set 4</div>
          </div>
          <div className="target-reps">Target Reps</div>
        </div>
        
        {todaysWorkout.map((exercise, index) => {
          const exerciseData = completedWorkout?.exercises?.find(e => e.name === exercise.name);
          
          return (
            <div key={index} className="exercise-row">
              <div className="exercise-name">{exercise.name}</div>
              <div className="sets-data">
                {[1, 2, 3, 4].map(setNum => {
                  const setData = exerciseData?.sets?.find(s => s.setNumber === setNum);
                  return (
                    <div key={setNum} className="set-info">
                      {setData ? (
                        <>
                          <div className="weight">{setData.weight || '-'} lbs</div>
                          <div className="reps">{setData.reps || '-'} reps</div>
                        </>
                      ) : (
                        <div className="empty-set">-</div>
                      )}
                    </div>
                  );
                })}
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