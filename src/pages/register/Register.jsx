import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import './register.css'
import { Link } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const Register = () => {
  const doctorsCollection = collection(db, 'doctors')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()
    if (password === repeatPassword) {
      await addDoc(doctorsCollection, {
        email: email,
      })
        .then()
        .catch((err) => {
          console.log(err)
        })
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/')
        })
        .catch(console.error)
    }
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Nacelle App</h3>
        </div>
        <div className='loginRight'>
          <form className='loginBox'>
            {/* <input  required placeholder='Username' className='loginInput' /> */}
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
            <input
              onChange={(event) => setRepeatPassword(event.target.value)}
              required
              type='password'
              placeholder='Password Again'
              className='loginInput'
            />
            <button onClick={handleRegister} type='submit' className='loginButton'>
              Create Account
            </button>
            <p>
              <Link style={{ color: '#333', textDecoration: 'none' }} to='/login'>
                Log into Account
              </Link>
            </p>
            {/* <button className='loginRegister'>
 
            </button> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
