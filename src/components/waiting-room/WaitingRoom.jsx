import ServicingNow from '../servicing-now/ServicingNow'
import ServicingDoctor from '../servicing-doctor/ServicingDoctor'
import UpcommingList from '../upcommingList/UpcommingList'
import { useSelector } from 'react-redux'
import './waiting-room.css'

const WaitingRoom = () => {
  const currentDoctor = useSelector((state) => state.user.user.currentDoctor)

  return (
    <div className='waitingRoomContainer'>
      <h2>Waiting Room</h2>
      <div className='waitingRoomWrapper'>
        <ServicingNow servicingNow={currentDoctor.servicingNow} />
        <ServicingDoctor doctor={currentDoctor.email} />
      </div>
      <div className='waitingRoomUpcommingList'>
        <UpcommingList waitingRoom upcommingList={currentDoctor.waitingRoom} />
      </div>
    </div>
  )
}

export default WaitingRoom
