import React, { useEffect, useRef, useState } from 'react'

const Stopwatch = () => {
  const [now, setNow] = useState(null)
  const [startTime, setStartTime] = useState(null)
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef(null)
  let secondPassed = 0

  useEffect(() => {
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalRef.current = setInterval(() => {
        setStartTime(startTime + 1)
      }, 10)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, startTime, now])

  if (startTime !== null && now !== null) {
    console.log('now', now, 'start', startTime)
    secondPassed = (startTime - now) / 1000
    console.log('secondPassed', secondPassed)
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }
  const handleReset = () => {
    clearInterval(intervalRef.current)
    setNow(0)
    setStartTime(0)
  }
  // Hours calculation
  const hours = Math.floor(startTime / 360000)
  console.log('hour', hours)
  // Minutes calculation
  const minutes = Math.floor((startTime % 360000) / 6000)

  // Seconds calculation
  const seconds = Math.floor((startTime % 6000) / 100)

  // Milliseconds calculation
  const milliseconds = startTime % 100

  return (
    <>
      <h1>Time Difference:{secondPassed.toFixed(3)}</h1>
      <p>
        {hours}:{minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}:
        {milliseconds.toString().padStart(2, '0')}
      </p>
      <div>
        <button onClick={handleStartStop}>
          {' '}
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  )
}

export default Stopwatch
