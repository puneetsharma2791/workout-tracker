import React, { useState, useEffect } from 'react';
import './App.css';
import { defaultWorkoutTemplate } from './data/workoutTemplate';
import { getWorkoutTemplate, saveWorkoutTemplate, getWeekNumber } from './utils/localStorage';
import WorkoutDisplay from './components/WorkoutDisplay';
import WorkoutEntry from './components/WorkoutEntry';
import TemplateEditor from './components/TemplateEditor';

function App() {
  const [currentView, setCurrentView] = useState('today');
  const [selectedDay, setSelectedDay] = useState(null);
  const [workoutTemplate, setWorkoutTemplate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const savedTemplate = getWorkoutTemplate();
    if (savedTemplate) {
      setWorkoutTemplate(savedTemplate);
    } else {
      setWorkoutTemplate(defaultWorkoutTemplate);
      saveWorkoutTemplate(defaultWorkoutTemplate);
    }

    const today = new Date();
    const dayIndex = today.getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    setSelectedDay(dayMap[dayIndex]);
  }, []);

  const handleTemplateUpdate = (newTemplate) => {
    setWorkoutTemplate(newTemplate);
    saveWorkoutTemplate(newTemplate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayIndex = date.getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    setSelectedDay(dayMap[dayIndex]);
  };

  if (!workoutTemplate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Workout Tracker - Puneet</h1>
        <div className="week-info">
          Week: {getWeekNumber(selectedDate)}
        </div>
        <nav className="main-nav">
          <button 
            className={currentView === 'today' ? 'active' : ''}
            onClick={() => setCurrentView('today')}
          >
            Today's Workout
          </button>
          <button 
            className={currentView === 'entry' ? 'active' : ''}
            onClick={() => setCurrentView('entry')}
          >
            Log Workout
          </button>
          <button 
            className={currentView === 'template' ? 'active' : ''}
            onClick={() => setCurrentView('template')}
          >
            Edit Template
          </button>
        </nav>
      </header>

      <main className="App-main">
        {currentView === 'today' && (
          <WorkoutDisplay 
            workoutTemplate={workoutTemplate}
            selectedDay={selectedDay}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        )}
        
        {currentView === 'entry' && (
          <WorkoutEntry 
            workoutTemplate={workoutTemplate}
            selectedDay={selectedDay}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        )}
        
        {currentView === 'template' && (
          <TemplateEditor 
            workoutTemplate={workoutTemplate}
            onSave={handleTemplateUpdate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
