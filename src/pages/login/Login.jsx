import React, { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import './login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [doctor, setDoctor] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
            currentDoctor: doctor,
          })
        )
        navigate('/')
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const findCurrentDoctor = async () => {
      const doctorsRep = collection(db, 'doctors')
      const queryToFirestore = query(doctorsRep, where('email', '==', email))
      const querySnapshot = await getDocs(queryToFirestore)
      querySnapshot.forEach((doc) => {
        setDoctor({ ...doc.data(), id: doc.id })
      })
    }
    findCurrentDoctor()
  }, [email])

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Nacelle App</h3>
        </div>
        <div className='loginRight'>
          <form className='loginBox'>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type='email'
              required
              placeholder='Email'
              className='loginInput'
            />
            <input
              onChange={(event) => setPassword(event.target.value)}
              required
              type='password'
              minLength='6'
              placeholder='Password'
              className='loginInput'
            />
            <button
              type='button'
              onClick={() => handleLogin(email, password)}
              className='loginButton'
            >
              Log into Account
            </button>
            <p>
              <Link style={{ color: '#333', textDecoration: 'none' }} to='/register'>
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
