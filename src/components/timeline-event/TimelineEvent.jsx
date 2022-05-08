import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
// import Typography from '@mui/material/Typography'
import './timeline-event.css'

import HistoryDraft from '../draft/HistoryDraft'
// import Draft from '../draft/Draft'

const TimelineEvent = ({ event }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align='right'
        variant='body2'
        color='text.secondary'
      >
        <span className='eventDate'>{event[1].date}</span>
        <h4 className='eventType'>{event[1].eventType}</h4>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot></TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        {/* <Draft readOnly /> */}
        <HistoryDraft event={event} />
        {/* <Typography component='span'>{event.eventComments}</Typography> */}
      </TimelineContent>
    </TimelineItem>
  )
}

export default TimelineEvent
