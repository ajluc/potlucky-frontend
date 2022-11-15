import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GetEventById } from '../services/EventServices'

const EventDetails = ({ user }) => {
  let { id } = useParams()
  let navigate = useNavigate()
  const [eventDetails, setEventDetails] = useState(null)

  useEffect(() => {
    const handleEventDetails = async () => {
      console.log(id)
      const data = await GetEventById(id)
      setEventDetails(data)
    }
    handleEventDetails()
  }, [id])

  return user ? (
    <div>{/* <h3>{eventDetails.eventName}</h3> */}</div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default EventDetails
