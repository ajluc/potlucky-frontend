import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()

  const startState = {
    username: '',
    name: '',
    email: '',
    password: ''
  }

  const [formState, setFormState] = useState(startState)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      username: formState.username,
      name: formState.name,
      email: formState.email,
      password: formState.password
    })
    setFormState(startState)
    navigate('/signin')
  }

  return (
    <div className="flex-column page-container">
      <div className="card">
        <h1 id='reg-title'>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="username">Username  </label> */}
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
            value={formState.username}
            required
          />
          {/* <label htmlFor="name">Name  </label> */}
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            value={formState.name}
            required
          />
          {/* <label htmlFor="email">Email  </label> */}
          <input
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email address"
            value={formState.email}
            required
          />
          {/* <label htmlFor="password">Password  </label> */}
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={formState.password}
            required
          />
          <button className='button-span button-flip'>Register</button>            
        </form>
      </div>
    </div>
  )
}

export default Register

//username, name, email, password,
