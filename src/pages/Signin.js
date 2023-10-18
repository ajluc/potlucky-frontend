import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SignInUser } from '../services/Auth'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  const startState = {
    email: '',
    password: ''
  }

  const [formState, setFormState] = useState(startState)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formState)
    if (payload) {
      await setUser(payload)
      setFormState(startState)
      navigate('/')
    } else {
      window.alert('Incorrect Email or Password')
      setFormState({ email: formState.email, password: '' })
    }
  }

  const demoSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser({
      email: 'amayajlucas@gmail.com',
      password: 'potlucky1234'
    })
    await setUser(payload)
    navigate('/')
  }

  return (
    <div className="flex-column page-container">
      <div className="card">
        <h1 id='reg-title'>Sign In to Potlucky</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="email">Email</label> */}
          <input
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email address"
            value={formState.email}
            required
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={formState.password}
            required
          />
          <button className='button-span button-flip'>Sign in</button>
        </form>
        <div className='flex-row'>
        <button className='button-span' onClick={() => navigate('/register')}>
          Register
        </button>
        <button className='button-span' onClick={demoSubmit}>
          Demo User
        </button>
      </div>
      </div>
    </div>
  )
}

export default SignIn
