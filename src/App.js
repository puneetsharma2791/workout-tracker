import React, { useState, useEffect } from 'react';
import './App.css';
import { getDefaultTemplateForUser } from './data/workoutTemplate';
import { getWorkoutTemplate, saveWorkoutTemplate, getWeekNumber } from './utils/localStorage';
import WorkoutDisplay from './components/WorkoutDisplay';
import WorkoutEntry from './components/WorkoutEntry';
import TemplateEditor from './components/TemplateEditor';

function App() {
  const [currentView, setCurrentView] = useState('today');
  const [selectedDay, setSelectedDay] = useState(null);
  const [workoutTemplate, setWorkoutTemplate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState('puneet');

  useEffect(() => {
    // Get user from URL hash (e.g., #vinay or #puneet)
    const getUserFromUrl = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'vinay' || hash === 'puneet') {
        return hash;
      }
      return 'puneet'; // Default to Puneet
    };

    const user = getUserFromUrl();
    setCurrentUser(user);

    const savedTemplate = getWorkoutTemplate(user);
    if (savedTemplate) {
      setWorkoutTemplate(savedTemplate);
    } else {
      const defaultTemplate = getDefaultTemplateForUser(user);
      setWorkoutTemplate(defaultTemplate);
      saveWorkoutTemplate(defaultTemplate, user);
    }

    const today = new Date();
    const dayIndex = today.getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    setSelectedDay(dayMap[dayIndex]);

    // Listen for hash changes
    const handleHashChange = () => {
      const newUser = getUserFromUrl();
      if (newUser !== currentUser) {
        window.location.reload(); // Reload to load new user's data
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTemplateUpdate = (newTemplate) => {
    setWorkoutTemplate(newTemplate);
    saveWorkoutTemplate(newTemplate, currentUser);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayIndex = date.getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    setSelectedDay(dayMap[dayIndex]);
  };

  const switchUser = (user) => {
    window.location.hash = user;
    window.location.reload();
  };

  if (!workoutTemplate) {
    return <div>Loading...</div>;
  }

  const displayName = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Workout Tracker - {displayName}</h1>
        <div className="user-switcher">
          <button 
            className={currentUser === 'puneet' ? 'active' : ''}
            onClick={() => switchUser('puneet')}
          >
            Puneet
          </button>
          <button 
            className={currentUser === 'vinay' ? 'active' : ''}
            onClick={() => switchUser('vinay')}
          >
            Vinay
          </button>
        </div>
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
            currentUser={currentUser}
          />
        )}
        
        {currentView === 'entry' && (
          <WorkoutEntry 
            workoutTemplate={workoutTemplate}
            selectedDay={selectedDay}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            currentUser={currentUser}
          />
        )}
        
        {currentView === 'template' && (
          <TemplateEditor 
            workoutTemplate={workoutTemplate}
            onSave={handleTemplateUpdate}
            currentUser={currentUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;
