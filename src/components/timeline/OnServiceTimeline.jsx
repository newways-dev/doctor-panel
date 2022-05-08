import { useSelector } from 'react-redux'
import { doc, onSnapshot } from 'firebase/firestore'
import Timeline from '@mui/lab/Timeline'
import TimelineEvent from '../timeline-event/TimelineEvent'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'

import './on-service-timelice.css'

const OnServiceTimeline = () => {
  const [timelineEvents, setTimelineEvents] = useState([])
  const patientId = useSelector((state) => state.user.user.currentDoctor?.servicingNow)
  const doctorId = useSelector((state) => state.user.user.currentDoctor?.id)

  useEffect(() => {
    if (patientId) {
      const unsub = onSnapshot(doc(db, 'test-outpatients', patientId), (doc) => {
        const events = doc.data().events
        const sortedEvents = events.filter((event) => event.eventAuthor === doctorId)
        const convertToArray = Object.entries(sortedEvents)
        setTimelineEvents(convertToArray)
      })
      return unsub
    }
  }, [patientId, doctorId])

  return (
    <div className='timeLineContainer'>
      <Timeline>
        {timelineEvents &&
          timelineEvents.map((event, index) => (
            <TimelineEvent key={index} event={event} />
          ))}
      </Timeline>
    </div>
  )
}

export default OnServiceTimeline
