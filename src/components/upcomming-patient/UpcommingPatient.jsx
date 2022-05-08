import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import man from '../../assets/foto/man.jpg'
import './upcomming-patient.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateServicingNow } from '../../redux/slices/userSlice'

const UpcommingPatient = ({ waitingRoom, listPatient }) => {
  const id = useSelector((state) => state.user.user.currentDoctor.id)
  const [patient, setPatient] = useState({})

  const dispatch = useDispatch()

  const handleClick = async () => {
    await updateDoc(doc(db, 'doctors', id), {
      servicingNow: listPatient,
    })
    dispatch(
      updateServicingNow({
        servicingNow: listPatient,
      })
    )
  }

  useEffect(() => {
    const getPatient = async () => {
      const docRef = doc(db, 'test-outpatients', listPatient)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setPatient(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    getPatient()
  }, [listPatient])

  return (
    <div className='upcommingPatientContainer'>
      <img className='upcommingPatientImg' src={man} alt='' />
      <span className='upcommingPatientName'>
        {patient.firstName} {patient.lastName}
      </span>
      <span className='upcommingPatientTime'>{patient.checkInTime}</span>
      {waitingRoom && (
        <div className='buttons'>
          <button onClick={handleClick} className='diangosingButton'>
            Start diagnosing
          </button>
          <button className='pauseButton'>Pause</button>
        </div>
      )}
    </div>
  )
}

export default UpcommingPatient
