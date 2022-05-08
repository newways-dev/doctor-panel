import ServicingNow from '../servicing-now/ServicingNow'
import UpcommingList from '../upcommingList/UpcommingList'
import './waiting-bar.css'

const WaitingBar = () => {
  return (
    <div className='waitingBarContainer'>
      <h1 className='waitingBarTitle'>Waiting Room</h1>
      <ServicingNow />
      <div className='upcommingContainer'>
        <UpcommingList />
      </div>
    </div>
  )
}

export default WaitingBar
