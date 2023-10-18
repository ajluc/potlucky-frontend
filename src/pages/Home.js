import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { GetEventsByUser, GetEventsByHost } from '../services/EventServices'
import SignIn from './Signin'

const Home = ({ user, setUser }) => {
  let navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [userHostedEvents, setUserHostedEvents] = useState([])

  const handleEvents = async () => {
    const eventsData = await GetEventsByUser(user.id)
    const userHostedEventsData = await GetEventsByHost(user.id)
    setEvents(eventsData.events)
    setUserHostedEvents(userHostedEventsData)
  }

  useEffect(() => {
    if (user) handleEvents()
  }, [user])

  const viewEventDetails = (id) => {
    navigate(`/events/${id}`)
  }

  return user ? (
    <div className='page-container'>
      <div className='card'>
      <h1 id='title'>Welcome back to the party!</h1>
      {/* <h2 style={{marginTop: '0px'}}>You are hosting {userHostedEvents.length} and attending {events.length} upcoming events</h2> */}
      <h2 className="title">Hosting</h2>
      <div className="flex-row card-container">
          {userHostedEvents.length > 0 ? (
            userHostedEvents.map((event) => (
              <div key={event.id} className='home-cards'>
                <EventCard
                  id={event.id}
                  isHost={true}
                  eventName={event.eventName}
                  eventDate={event.date}
                  eventLocation={event.location}
                  eventDescription={event.description}
                  items={event.items}
                  userId={user.id}
                  onClick={viewEventDetails}
                />
              </div>
            ))
          ) : (
            <div> You're not hosting any events</div>
          )}
        </div>
        <h2>Attending</h2>
        <div className="flex-row card-container">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className='home-cards'>
                <EventCard
                  id={event.id}
                  isHost={false}
                  eventName={event.eventName}
                  eventDate={event.date}
                  eventLocation={event.location}
                  eventDescription={event.description}
                  items={event.items}
                  userId={user.id}
                  onClick={viewEventDetails}
                />
              </div>
            ))
          ) : (
            <p> You're not attending any events</p>
          )}
        </div>
      </div>
      </div>
  ) : (
    <div>
      <SignIn setUser={setUser} />
    </div>
  )
}

export default Home
