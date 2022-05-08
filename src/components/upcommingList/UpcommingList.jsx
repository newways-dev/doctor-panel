import { useSelector } from 'react-redux'
import UpcommingPatient from '../upcomming-patient/UpcommingPatient'
import './upcomming-list.css'

const UpcommingList = ({ waitingRoom }) => {
  const upcomming = useSelector((state) => state.user.user.waitingRoom)

  return (
    <div>
      <h4>Upcoming: {upcomming && upcomming.length}</h4>
      {waitingRoom && <button className='pauseList'>Pause List</button>}
      <div className='listInfo'>
        <span>Patient Name</span>
        <span>Check in time</span>
        {waitingRoom && <span>Action</span>}
      </div>
      <ul className='upcommingList'>
        {upcomming &&
          upcomming.map((item) => (
            <li key={item} className='upcommingListItem'>
              <UpcommingPatient
                listPatient={item}
                waitingRoom={waitingRoom && waitingRoom}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default UpcommingList
