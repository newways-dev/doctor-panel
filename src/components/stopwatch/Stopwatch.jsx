import React from 'react'
import { useStopwatch } from 'react-timer-hook'
import './stopwatch.css'

const Stopwatch = () => {
  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
    autoStart: false,
  })

  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: '20px', fontWeight: '700' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <div className='buttons'>
        <button className='stopwatchButton' onClick={start}>
          Start
        </button>
        <button className='stopwatchButton' onClick={pause}>
          Pause
        </button>
        <button className='stopwatchButton' onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Stopwatch
