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
        <h1 id='reg-title'>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="email"
            value={formState.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
            value={formState.password}
            required
          />
          <button>Sign in!</button>
        <p>New user?</p>
        <button onClick={() => navigate('/register')}>
          Register
        </button>
        <p>Want to take a test run?</p>
        <button onClick={demoSubmit}>
          Demo User
        </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
