import girl from '../../assets/foto/girl.jpg'
import TextField from '@mui/material/TextField'
import OnServiceTimeline from '../timeline/OnServiceTimeline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Draft from '../draft/Draft'
import './on-service.css'
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const OnService = () => {
  const servicingPatient = useSelector((state) => state.user.user.currentOutpatient)
  const outpatientId = useSelector((state) => state.user.user.currentOutpatient.id)
  const doctorId = useSelector((state) => state.user.user.currentDoctor.id)

  const [page, setPage] = useState('Examinations')
  const [vaccine, setVaccine] = useState('')
  const [vaccinesList, setVaccinesList] = useState([])

  var now = new Date().toDateString()

  const addVaccine = async () => {
    try {
      await updateDoc(doc(db, 'test-outpatients', outpatientId), {
        vaccines: arrayUnion({
          name: vaccine,
          date: now,
          eventAuthor: doctorId,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (outpatientId) {
      const unsub = onSnapshot(doc(db, 'test-outpatients', outpatientId), (doc) => {
        setVaccinesList(doc.data().vaccines)
      })
      return unsub
    }
  }, [outpatientId])

  console.log(vaccinesList)

  return (
    <>
      <div className='onServiceContainer'>
        <div className='onServiceLeft'>
          <div className='patientCard'>
            <img className='patientFoto' src={girl} alt='' />
            <span className='patientName'>
              {servicingPatient.data &&
                servicingPatient.data.firstName + ' ' + servicingPatient.data.lastName}
            </span>
            <div className='patientInfo'>
              <div className='patientInfoLeft'>
                <span className='patientInfoLeftKey'>Age:</span>
                <span className='patientInfoLeftKey'>Height:</span>
                <span className='patientInfoLeftKey'>Weight:</span>
                <span className='patientInfoLeftKey'>Drinking Glass per day:</span>
                <span className='patientInfoLeftKey'>Known Health Problems:</span>
                <span className='patientInfoLeftKey'>Allergies:</span>
                <span className='patientInfoLeftKey'>Joining date:</span>
              </div>
              <div className='patientInfoRight'>
                <span className='patientInfoRightValue'>No data yet</span>
                <span className='patientInfoRightValue'>
                  {servicingPatient.data &&
                    servicingPatient.data.subCollection.personalData.basicHealthInfo
                      .height}
                </span>
                <span className='patientInfoRightValue'>
                  {servicingPatient.data &&
                    servicingPatient.data.subCollection.personalData.basicHealthInfo
                      .weight}
                </span>
                <span className='patientInfoRightValue'>
                  {servicingPatient.data &&
                    servicingPatient.data.subCollection.personalData.basicHealthInfo
                      .drinkingGlassPerDay}
                </span>
                <span className='patientInfoRightValue'>No data yet</span>
                <span className='patientInfoRightValue'>
                  {servicingPatient.data &&
                    servicingPatient.data.subCollection.personalData.basicHealthInfo
                      .allergies}
                </span>
                <span className='patientInfoRightValue'>No data also</span>
              </div>
            </div>
          </div>
        </div>
        <div className='onServiceRight'>
          <div className='onServiceNavigation'>
            <ul className='onServiceNavigationList'>
              <li
                onClick={() => setPage('Examinations')}
                className='onServiceNavigationItem'
              >
                Examinations
              </li>
            </ul>
            <ul className='onServiceNavigationList'>
              <li
                onClick={() => setPage('Vaccinations')}
                className='onServiceNavigationItem'
              >
                Vaccinations
              </li>
            </ul>
            <ul className='onServiceNavigationList'>
              <li onClick={() => setPage('History')} className='onServiceNavigationItem'>
                History
              </li>
            </ul>
          </div>
          {page === 'Examinations' ? (
            <>
              <div className='onServiceDraftsContainer'>
                <div className='draft'>
                  <Draft outpatientId={servicingPatient.id} doctorId={doctorId} />
                </div>
              </div>
            </>
          ) : page === 'Vaccinations' ? (
            <div className='vaccinationsContainer'>
              <ul className='vaccinesList'>
                <h3>List of Vaccines</h3>

                {vaccinesList.length > 0 &&
                  vaccinesList.map((item) => (
                    <li className='vaccinesListItem'>{item.name}</li>
                  ))}
              </ul>
              <TextField
                onChange={(e) => setVaccine(e.target.value)}
                className='vaccineField'
                id='outlined-textarea'
                label='Vaccine Name'
                placeholder='Enter a Vaccine Name'
                multiline
              />
              <button onClick={addVaccine} className='vaccineButton'>
                Submit
              </button>
            </div>
          ) : (
            <>
              <OnServiceTimeline />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default OnService
