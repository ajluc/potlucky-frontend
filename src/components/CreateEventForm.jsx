import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateEvent } from '../services/EventServices'

const CreateEventForm = ({ user }) => {
  let navigate = useNavigate()

  const startState = {
    eventName: '',
    date: '',
    location: '',
    description: '',
    userId: [user.id],
    hostId: user.id
  }

  const [formState, setFormState] = useState(startState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newEvent = await CreateEvent(formState)
    setFormState(startState)
    navigate(`/events/${newEvent.id}`)
  }

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        id="eventName"
        placeholder='Event Name'
        value={formState.eventName}
      />
      <input
        onChange={handleChange}
        type="datetime-local"
        id="date"
        placeholder='Date'
        value={formState.date}
      />
      <input
        onChange={handleChange}
        type="text"
        id="location"
        placeholder='Location'
        value={formState.location}
      />
      <textarea
        onChange={handleChange}
        id="description"
        placeholder='Description'
        value={formState.description}
      />
      <button className='button-span button-flip' type="submit">Submit</button>
    </form>
  )
}

export default CreateEventForm

//eventname, date, location, description
