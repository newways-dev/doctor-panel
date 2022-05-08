import { CircularProgressbar } from 'react-circular-progressbar'
import './progressBar.css'

const ProgressBar = ({ data }) => {
  return (
    <div className='totalCard'>
      <div className='totalCardLeft'>
        <CircularProgressbar
          className='circularProgressbar'
          value={data}
          text={`${data}%`}
        />
      </div>
      <div className='totalCardRight'>
        <span>21</span>
        <span>Total patients per week</span>
      </div>
    </div>
  )
}

export default ProgressBar
