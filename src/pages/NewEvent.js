import CreateEventForm from '../components/CreateEventForm'
import { useNavigate } from 'react-router-dom'
import SignIn from './Signin'

const NewEvent = ({ user, setUser }) => {
  let navigate = useNavigate()

  return user ? (
    <div className="flex-column page-container">
      <div className="card">
        <div className="buffer">
          <h1 id="reg-title">Create New Event</h1>
          <CreateEventForm user={user} />
        </div>
      </div>
    </div>
  ) : (
    <div className="protected">
      <SignIn setUser={setUser} />
    </div>
  )
}

export default NewEvent
