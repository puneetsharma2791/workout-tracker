import React, { useState, useEffect } from 'react';
import { getDayName, daysOfWeek, getDefaultTemplateForUser } from '../data/workoutTemplate';
import { clearUserTemplate } from '../utils/localStorage';
import './TemplateEditor.css';

const TemplateEditor = ({ workoutTemplate, onSave, currentUser }) => {
  const [editedTemplate, setEditedTemplate] = useState({});
  const [selectedDay, setSelectedDay] = useState('monday');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    setEditedTemplate(JSON.parse(JSON.stringify(workoutTemplate)));
  }, [workoutTemplate]);

  const handleExerciseChange = (day, exerciseIndex, field, value) => {
    const newTemplate = { ...editedTemplate };
    newTemplate[day][exerciseIndex][field] = value;
    setEditedTemplate(newTemplate);
    setSaveStatus('');
  };

  const handleAddExercise = (day) => {
    const newTemplate = { ...editedTemplate };
    newTemplate[day].push({
      name: '',
      sets: 4,
      targetReps: ''
    });
    setEditedTemplate(newTemplate);
    setSaveStatus('');
  };

  const handleRemoveExercise = (day, exerciseIndex) => {
    const newTemplate = { ...editedTemplate };
    newTemplate[day].splice(exerciseIndex, 1);
    setEditedTemplate(newTemplate);
    setSaveStatus('');
  };

  const handleSave = () => {
    onSave(editedTemplate);
    setSaveStatus('Template saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleReset = () => {
    setEditedTemplate(JSON.parse(JSON.stringify(workoutTemplate)));
    setSaveStatus('Template reset to last saved version');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`This will reset your template to the default ${currentUser === 'vinay' ? 'Vinay' : 'Puneet'} workout plan. Are you sure?`)) {
      clearUserTemplate(currentUser);
      const defaultTemplate = getDefaultTemplateForUser(currentUser);
      setEditedTemplate(defaultTemplate);
      onSave(defaultTemplate);
      setSaveStatus('Template reset to default!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  if (!editedTemplate[selectedDay]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="template-editor">
      <h2>Edit Workout Template</h2>
      
      <div className="day-selector">
        {daysOfWeek.map(day => (
          <button
            key={day}
            className={selectedDay === day ? 'active' : ''}
            onClick={() => setSelectedDay(day)}
          >
            {getDayName(day)}
          </button>
        ))}
      </div>
      
      <div className="exercises-editor">
        <h3>{getDayName(selectedDay)} Exercises</h3>
        
        {editedTemplate[selectedDay].map((exercise, index) => (
          <div key={index} className="exercise-editor">
            <div className="exercise-fields">
              <input
                type="text"
                placeholder="Exercise name"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(selectedDay, index, 'name', e.target.value)}
                className="exercise-name-input"
              />
              <input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(selectedDay, index, 'sets', parseInt(e.target.value) || 0)}
                className="sets-input"
                min="1"
                max="10"
              />
              <input
                type="text"
                placeholder="Target reps (e.g., 8-10)"
                value={exercise.targetReps}
                onChange={(e) => handleExerciseChange(selectedDay, index, 'targetReps', e.target.value)}
                className="reps-input"
              />
              <button
                onClick={() => handleRemoveExercise(selectedDay, index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => handleAddExercise(selectedDay)}
          className="add-exercise-button"
        >
          + Add Exercise
        </button>
      </div>
      
      <div className="template-actions">
        <button onClick={handleSave} className="save-button">
          Save Template
        </button>
        <button onClick={handleReset} className="reset-button">
          Reset Changes
        </button>
        <button onClick={handleResetToDefault} className="default-button">
          Reset to Default {currentUser === 'vinay' ? 'Vinay' : 'Puneet'} Plan
        </button>
        {saveStatus && (
          <div className="save-status">{saveStatus}</div>
        )}
      </div>
    </div>
  );
};

export default TemplateEditor;