import SidebarLayout from '@/layouts/SidebarLayout';
import React, { useEffect, useState } from 'react';

function Pomodoro() {
  const [fullScreen, setFullScreen] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

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
      setTime(15 * 60);
      setSessionCount(0);
    } else {
      setIsBreak(true);
      setTime(5 * 60);
      setSessionCount(sessionCount + 1);
    }
  };

  const openFullScreen = () => {
    if (!document.fullscreenElement) {
      setFullScreen(true);
      document.documentElement.requestFullscreen();
    } else {
      
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      console.log('Exited fullscreen mode');
      alert('Exited fullscreen mode');
      setFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      clearInterval(interval);
      const startBreak = window.confirm('Start a break?');
      if (startBreak) {
        handleBreakStart();
      } else{
        setTime(25 * 60);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const toggleTimer = () => {
    setIsActive(prevIsActive => !prevIsActive);
    openFullScreen();
    if (isActive) {
      pauseTimer();
    }
  };
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setIsBreak(false);
    setSessionCount(0);
  };

  return (
    <SidebarLayout>
      {/* <div onClick={openFullScreen}>Pomodoro</div>
      {
        
        fullScreen?
        <div>in  full screen</div>
        :
        <div>not in full screen</div>
      } */}
      <main className='h-screen w-full '>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Pomodoro Timer</h1>
        <div className="text-9xl font-bold mb-8 font-mono">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
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
      </div>
      </main>
    </SidebarLayout>
  );
}

export default Pomodoro;
