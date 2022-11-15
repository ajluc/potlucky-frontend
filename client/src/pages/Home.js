import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { GetEvents } from '../services/EventServices'

const Home = ({ user }) => {
  let navigate = useNavigate()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const handleEvents = async () => {
      const data = await GetEvents()
      setEvents(data)
    }
    handleEvents()
  }, [])

  const viewEventDetails = (id) => {
    navigate(`/events/${id}`)
  }

  return user ? (
    <div>
      <div>
        <h3>Your Events</h3>
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            eventName={event.eventName}
            eventDate={event.date}
            eventLocation={event.location}
            onClick={viewEventDetails}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="protected">
      <h3>Please sign in</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default Home
