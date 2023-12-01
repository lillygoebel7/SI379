import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(25); // set to 25 mins
  const [breakDuration, setBreakDuration] = useState(5); // set to  5 mins
  const [timer, setTimer] = useState(sessionDuration * 60);
  const [breakTimer, setBreakTimer] = useState(breakDuration * 60);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    let interval;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((previousTime) => previousTime - 1);
      }, 1000);
    } else if (timer === 0 && !isBreak) {
      clearInterval(interval);
      alert(`Nice! Take a ${breakDuration}-minute break.`);
      setIsActive(false);
      setIsBreak(true);

      setTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === currentTaskIndex
            ? { ...task, completedSessions: (task.completedSessions || 0) + 1 }
            : task
        )
      );
      setBreakTimer(breakDuration * 60);
    } 
    else if (isBreak && breakTimer > 0) {
      interval = setInterval(() => {
        setBreakTimer((prevBreakTimer) => prevBreakTimer - 1);
      }, 1000);
    } 
    else if (isBreak && breakTimer === 0) {
      clearInterval(interval);
      alert('Break Over!');
      setIsBreak(false);
      setTimer(sessionDuration * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timer, isBreak, breakTimer, sessionDuration, breakDuration, currentTaskIndex]);

  const addTask = () => {
    setTasks([...tasks, { name: task, workTimer: sessionDuration * 60, breakTimer: breakDuration * 60 }]);
    setTask('');
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const startTimer = (index) => {
    if (!isActive && !isBreak) {
      setCurrentTaskIndex(index);
      setIsActive(true);
      setIsBreak(false);
      setTimer(tasks[index].workTimer);
    }
  };

  const resetTimer = () => {
    setCurrentTaskIndex(null);
    setIsActive(false);
    setIsBreak(false);
    setTimer(sessionDuration * 60);
    setBreakTimer(breakDuration * 60);
  };

  const timing = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes)}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1> Lemon Timer </h1>
      <div>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a new task" />
        <button onClick={addTask}> Add </button>
      </div>
      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            {item.name}
            {item.completedSessions && Array.from({ length: item.completedSessions }, (_, i) => (
              <FontAwesomeIcon key={i} icon={faLemon} style={{ marginLeft: '5px', color: 'yellow' }} />
            ))}
            <button onClick={() => removeTask(index)}>Remove</button>
            <button onClick={() => startTimer(index)} disabled={isActive || isBreak || index === currentTaskIndex}>
              Start Timer
            </button>
          </li>
        ))}
      </ul>
      <div>
        <div>
          <label>
            Session Duration:
            <input type="number" value={sessionDuration} onChange={(e) => setSessionDuration(parseInt(e.target.value, 10))} />
          </label>
        </div>
        <div>
          <label>
            Break Duration:
            <input type="number" value={breakDuration} onChange={(e) => setBreakDuration(parseInt(e.target.value, 10))} />
          </label>
        </div>
        <p>{isBreak ? 'break' : 'lemon'}: {timing(isBreak ? breakTimer : timer)}</p>
        <button onClick={resetTimer}>Reset Timer</button>
      </div>
    </div>
  );
}

export default App;
