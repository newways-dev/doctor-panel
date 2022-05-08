import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { updateServicingNow, setCurrentOutpatient } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import man from '../../assets/foto/man.jpg'
import { db } from '../../firebase'
import './servicing-doctor.css'
import { useState } from 'react'

const ServicingDoctor = ({ doctor }) => {
  const [alert, setAlert] = useState(false)
  const doctorId = useSelector((state) => state.user.user.currentDoctor.id)
  const waitingRoom = useSelector((state) => state.user.user.waitingRoom)
  const currentOutpatientId = useSelector((state) => state.user.user.currentOutpatient.id)
  const dispatch = useDispatch()

  const handleFinish = async () => {
    const updatedRoom = waitingRoom.filter((id) => id !== currentOutpatientId)
    const doctorsRef = doc(db, 'doctors', doctorId)
    try {
      await updateDoc(doctorsRef, {
        waitingRoom: updatedRoom,
        // servicingNow: '',
      })
    } catch (error) {
      console.log(error)
    }
    if (waitingRoom.length === 0) {
      try {
        await updateDoc(doctorsRef, {
          servicingNow: '',
        })
      } catch (error) {
        console.log(error)
      }
      setAlert(true)
      dispatch(
        updateServicingNow({
          servicingNow: '',
        })
      )
      dispatch(
        setCurrentOutpatient({
          currentOutpatient: {
            data: {
              firstName: 'loading...',
              lastName: 'loading...',
              email: 'loading...',
              subCollection: {
                personalData: {
                  basicInfo: {
                    address: 'loading...',
                    city: 'loading...',
                    phoneNumber: 'loading...',
                    insuranceNo: 'loading...',
                  },
                  basicHealthInfo: {
                    allergies: 'loading...',
                    bloodType: 'loading...',
                    height: 'loading...',
                    weight: 'loading...',
                    smokingPackPerDay: 'loading...',
                    drinkingGlassPerDay: 'loading...',
                  },
                },
                events: 'loading...',
              },
            },
            id: '',
          },
        })
      )
    }
  }

  return (
    <div className='servicingDoctorContainer'>
      {alert && <h2 style={{ color: 'green' }}>Great Work!</h2>}
      <div className='servicingDoctor'>
        <div className='servicingDoctorLeft'>
          <img className='servicingDoctorImg' src={man} alt='' />
        </div>
        <div className='servicingDoctorRight'>
          <div className='servicingDoctorRightTop'>
            <span className='servicingDoctorName'>{doctor}</span>
            <span className='servicingDoctorStatus'>Status</span>
            <span className='servicingDoctorAction'>Action</span>
          </div>
          <div className='servicingDoctorRightBottom'>
            <span className='servicingDoctorSpeciality'>Speciality of Doctor</span>
            <span className='servicingDoctorStatusInfo'>Waiting for X-Ray</span>
            <button onClick={handleFinish} className='finishButton'>
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicingDoctor
