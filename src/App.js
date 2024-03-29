import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import NewEvent from './pages/NewEvent'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SignIn from './pages/Signin'
import { Routes, Route } from 'react-router-dom'
import EventDetails from './pages/EventDetails'
import { CheckSession } from './services/Auth'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <main>
      <div className='shape'></div>
      <div className='shape'></div>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route
            path="/newevent"
            element={<NewEvent user={user} setUser={setUser} />}
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/events/:id" element={<EventDetails user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
