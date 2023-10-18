import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Comments from '../components/Comments'
import ItemsList from '../components/ItemsList'
import ShareLink from '../components/ShareLink'
import {
  GetEventById,
  AddGuest,
  DeleteEvent,
  UpdateEvent
} from '../services/EventServices'
import Avatar from 'boring-avatars'
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import img6 from '../images/6.png'

const EventDetails = ({ user }) => {
  let { id } = useParams()
  let navigate = useNavigate()

  // Placeholder images
  let images = [img1, img2, img3, img4, img5, img6]
  let image = id % 6

  const initialState = {
    date: '',
    location: '',
    description: ''
  }
  const [eventDetails, setEventDetails] = useState(null)
  const [edit, setEdit] = useState(false)
  const [formState, setFormState] = useState(initialState)
  const [sharing, setSharing] = useState(false)
  const [isOver, setIsOver] = useState(false)

  const handleEventDetails = async () => {
    const data = await GetEventById(id)
    setEventDetails(data)
    const eventDate = isInThePast(data.date)
    setIsOver(eventDate)
  }

  const handleClick = async (e) => {
    await AddGuest(id, { userId: user.id })
    handleEventDetails()
  }

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await UpdateEvent(id, formState)
    setEdit(false)
    handleEventDetails()
  }

  const editOnClick = () => {
    setEdit(true)
    setFormState({
      date: eventDetails.date,
      location: eventDetails.location,
      description: eventDetails.description
    })
  }

  const deleteOnClick = async (e) => {
    if (window.confirm('Are you sure you wish to delete this event?')) {
      await DeleteEvent(eventDetails.id)
      navigate('/')
    }
  }

  const isInThePast = (date) => {
    const today = new Date().toISOString()
    return date < today
  }

  useEffect(() => {
    handleEventDetails()
  }, [user])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatTime = (dateString) => {
    const options = { timeStyle: 'short' }
    return new Date(dateString).toLocaleTimeString('en-US', options)
  }

  return (
    <div className="page-container">

      <div className='fixed-column'>

        <img className='event-image' src={images[image]} />
        <h1 id='event-title'>{eventDetails?.eventName}</h1>

        <div className=''>
          {user?.id === eventDetails?.hostedBy.id ? (
            <div className="">
              {isOver ? (
                <p>You hosted this event</p>
              ) : (<></>
              )}
              {!isOver && (
                <div className="flex-row">
                  <button className='button-span' onClick={editOnClick}>
                    Edit
                  </button>
                  <button className='button-span' onClick={deleteOnClick}>
                    Delete
                  </button>
                </div>
              )}
            </div>
            ) : (
              <div>
                <h4>Hosted by {eventDetails?.hostedBy.name}</h4>
              </div>
            )}
        </div>
        {!isOver && (
            <div>
              {sharing && <ShareLink />}
              <button
                className="button-span button-flip"
                type="button"
                onClick={() => {
                  sharing ? setSharing(false) : setSharing(true)
                }}
              >
                Share
              </button>
            </div>
          )}
      </div>

      <div className='content-column card'>

        <div className=''>
          {edit ? (
            <form onSubmit={handleSubmit}style={{width: '100%'}}>
              <input
                type="datetime-local"
                value={formState.date}
                id="date"
                onChange={handleChange}
              />
              <input
                type="text"
                value={formState.location}
                id="location"
                onChange={handleChange}
              />
              <textarea
                rows="4"
                cols="50"
                onChange={handleChange}
                id="description"
                value={formState.description}
              />
              <button className='button-span button-flip' type="submit">
                Submit
              </button>
            </form>
          ) : (
            <div>

                  {isOver ? (
                    <div>
                      <p>You missed the party! It was on </p>
                      <h2>{formatDate(eventDetails?.date)}</h2>
                    </div>
                  ) : (
                    <div>
                      <h2 className="event-date">{formatDate(eventDetails?.date)}</h2>
                      <h3 className="event-time">{formatTime(eventDetails?.date)}</h3>
                    </div>
                  )}
                  {user ? (
                    <div className='flex-row'>
                      <div className='pin'></div>
                      <p className="">{eventDetails?.location}</p>
                    </div>
                  ) : (
                    <div className='flex-row'>
                      <div className="lock"></div>
                      <p>Private Location</p>
                    </div>
                  )}

              <p className="">{eventDetails?.description}</p>
            </div>
          )}
        </div>

        {user ? (
          <div>
            {eventDetails?.attendees.find((guest) => guest.id === user.id) ||
            user?.id === eventDetails?.hostedBy.id ? (
              <></>
            ) : (
              <div>
                <button className='button-span' onClick={handleClick}>
                  RSVP
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className='margin'>Please sign in or register to RSVP</h2>
            <button
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        )}

      {user &&
        (eventDetails?.attendees.find((guest) => guest.id === user.id) ||
          user?.id === eventDetails?.hostedBy.id) ? (
            <div>
                <h2>Bringing</h2>
                <ItemsList user={user} eventId={id} isOver={isOver} />
                <h2>Comments</h2>
                <Comments user={user} eventId={id} />
                <h2>Guests</h2>
                <div className='flex-row'>
                <Avatar
                      size={40}
                      name={eventDetails?.hostedBy.name}
                      variant="beam"
                      colors={[
                        '#F9DED3',
                        '#FDD1B6',
                        '#FAB4B6',
                        '#C7B6BE',
                        '#89ABB4'
                      ]}
                    />
                {eventDetails?.attendees.map((guest) => (
                    <Avatar
                      key={guest.id}
                      size={40}
                      name={guest.name}
                      variant="beam"
                      colors={[
                        '#F9DED3',
                        '#FDD1B6',
                        '#FAB4B6',
                        '#C7B6BE',
                        '#89ABB4'
                      ]}
                    />
                ))}
                </div>
              </div>
        ) : (
          <div></div>
        )}

      </div>      
    </div>
  )
}

export default EventDetails
