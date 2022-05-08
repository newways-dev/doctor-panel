import { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentOutpatient, updateWaitingRoom } from '../../redux/slices/userSlice'
import { useAuth } from '../../hooks/use-auth'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Search from '../../components/search/Search'
import Dashboard from '../../components/dashboard/Dashboard'
import WaitingRoom from '../../components/waiting-room/WaitingRoom'
import OnService from '../../components/on-service/OnService'
import './home.css'

const Home = () => {
  const { isAuth } = useAuth()

  const id = useSelector((state) => state.user.user.currentDoctor?.id)
  const [servicingPatientId, setServicingPatientId] = useState(null)
  const [servicingPatient, setServicingPatient] = useState({})
  const [waitingRoom, setWaitingRoom] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      const unsub = onSnapshot(doc(db, 'doctors', id), (doc) => {
        setServicingPatientId(doc.data().servicingNow)
      })
      return unsub
    }
  }, [id])

  useEffect(() => {
    const getOutpatient = async () => {
      if (servicingPatientId) {
        const docRef = doc(db, 'test-outpatients', servicingPatientId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const { events, ...restData } = docSnap.data()
          const id = docSnap.id
          const outpatient = {
            data: restData,
            id: id,
          }
          setServicingPatient(outpatient)
        } else {
          console.log('No such document!')
        }
      }
    }
    getOutpatient()
  }, [servicingPatientId])

  useEffect(() => {
    dispatch(
      setCurrentOutpatient({
        currentOutpatient: servicingPatient,
      })
    )
  }, [dispatch, servicingPatient])

  useEffect(() => {
    if (id) {
      const unsub = onSnapshot(doc(db, 'doctors', id), (doc) => {
        setWaitingRoom(doc.data().waitingRoom)
      })
      return unsub
    }
  }, [id])

  useEffect(() => {
    dispatch(
      updateWaitingRoom({
        waitingRoom: waitingRoom,
      })
    )
  }, [waitingRoom, dispatch])

  return isAuth ? (
    <div>
      <Header />
      <div className='container'>
        <Sidebar />
        <div className='wrapper'>
          <Search />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/waiting-room' element={<WaitingRoom />} />
            <Route path='/on-service' element={<OnService />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/login' />
  )
}

export default Home
