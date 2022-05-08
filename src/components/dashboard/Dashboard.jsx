import { useState } from 'react'
import Calendar from 'react-calendar'
import ProgressBar from '../progress-bar/ProgressBar'
import WaitingBar from '../waiting-bar/WaitingBar'
import AddToDo from '../todo/AddToDo'

import 'react-circular-progressbar/dist/styles.css'
import 'react-calendar/dist/Calendar.css'
import './dashboard.css'

const Dashboard = () => {
  const [value, onChange] = useState(new Date())
  const data1 = 50
  const data2 = 21

  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='left'>
          <div className='top'>
            <div className='totalContainer'>
              <ProgressBar data={data1} />
              <ProgressBar data={data2} />
            </div>
            <div className='calendarContainer'>
              <Calendar className={['calendar']} onChange={onChange} value={value} />
            </div>
            <AddToDo />
          </div>
        </div>
        <div className='right'>
          <WaitingBar />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
