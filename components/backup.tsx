import SidebarLayout from '@/layouts/SidebarLayout';
import React, { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const [showCards, setShowCards] = useState(true);

  const pauseTimer = () => {
    // Display a confirmation dialog
    const shouldStartBreak = window.confirm('Start a break now?');
    if (shouldStartBreak) {
      handleBreakStart();
    } else {
      setIsActive(false);
    }
  };

  const handleBreakStart = () => {
    if (sessionCount >= 3) {
      setIsBreak(false);
      setMinutes(15);
      setSeconds(0);
      setSessionCount(0);
    } else {
      setIsBreak(true);
      setMinutes(5);
      setSeconds(0);
      setSessionCount(sessionCount + 1);
    }
  };

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            // Show a confirmation dialog to start a break
            const startBreak = window.confirm('Start a break?');
            if (startBreak) {
              // if (sessionCount >= 3) {
              //   // Long break after 3 sessions
              //   setIsBreak(false);
              //   setMinutes(15);
              //   setSeconds(0);
              //   setSessionCount(0);
              // } else {
              //   // Short break
              //   setIsBreak(true);
              //   setMinutes(5);
              //   setSeconds(0);
              //   setSessionCount(sessionCount + 1);
              // }
              handleBreakStart();
            } else {
              // Reset the timer
              setMinutes(25);
              setSeconds(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && (minutes > 0 || seconds > 0)) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, minutes, seconds, sessionCount]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (isActive) {
      pauseTimer();
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
    setSessionCount(0);
  };

  return (
    <SidebarLayout>
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
    <div className="text-6xl font-bold mb-8">
      {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </div>
    <div className="space-x-4">
      <button
        className={`p-4 rounded-lg text-white ${
          isActive ? 'bg-red-500' : 'bg-green-500'
        }`}
        onClick={toggleTimer}
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button
        className="p-4 rounded-lg text-white bg-blue-500"
        onClick={resetTimer}
      >
        Reset
      </button>
    </div>

    {showCards && (
      <div className="mt-8 flex space-x-4">
        <div className="bg-gray-800 p-4 rounded shadow-md">Tasks</div>
        <div className="bg-gray-800 p-4 rounded shadow-md">Community</div>
        <div className="bg-gray-800 p-4 rounded shadow-md">My Space</div>
      </div>
    )}

    {isBreak && (
      <div className="mt-8 flex space-x-4">
        <div className="bg-gray-800 p-4 rounded shadow-md">Game 1</div>
        <div className="bg-gray-800 p-4 rounded shadow-md">Game 2</div>
        <div className="bg-gray-800 p-4 rounded shadow-md">Game 3</div>
      </div>
    )}
  </div>
    </SidebarLayout>
  );
}

export default PomodoroTimer;
