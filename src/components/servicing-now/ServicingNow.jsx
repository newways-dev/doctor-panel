import Stopwatch from '../stopwatch/Stopwatch'
import { ReactSVG } from 'react-svg'
import check from '../../assets/icons/check.svg'
import girl from '../../assets/foto/girl.jpg'
import { useSelector } from 'react-redux'
import './servicing-now.css'

const ServicingNow = () => {
  const servicingPatient = useSelector((state) => state.user.user.currentOutpatient)

  return (
    <div className='servicingNow'>
      <div className='servicingTop'>
        <span>Servicing now</span>
        <ReactSVG src={check} />
      </div>
      <div className='servicingPatient'>
        <div className='servicingPatientLeft'>
          <img className='servicingPatientImg' src={girl} alt='' />
        </div>
        <div className='servicingPatientRight'>
          <span className='servicingPatientName'>
            {servicingPatient &&
              servicingPatient.data &&
              servicingPatient.data.firstName + ' ' + servicingPatient.data.lastName}
          </span>
          <span className='servicingPatientTime'>
            <b>Runing time:</b>
            <div className='servicingPatientTimer'>
              <Stopwatch />
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ServicingNow
