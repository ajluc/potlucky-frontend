import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import img6 from '../images/6.png'

const EventCard = (details) => {
    let images = [img1, img2, img3, img4, img5, img6]
    let image = details.id % 6

    const isInThePast = (date) => {
        const today = new Date().toISOString()
        return date < today
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const formatTime = (dateString) => {
        const options = { timeStyle: 'short'}
        return new Date(dateString).toLocaleTimeString('en-US', options)
    }

    const PastEvent = ({ isOver }) => {
        return (
            <div className={isOver ? 'over' : ''} onClick={ () => {details.onClick(details.id)}}>
                <img className='event-image' src={images[image]} />
                <h3 className='event-name'>{details.eventName}</h3>
                <p className='date-card'>{formatDate(details.eventDate)} at {formatTime(details.eventDate)}</p>
                <p className='loc-card'>{details.eventLocation}</p>
                {/* {details.isHost ? (
                <h4>{details.eventDescription}</h4>
                ) : (
                    <div>
                        {details.items.find((item) => item.userId===details.userId) && <h4>You are bringing:</h4>}
                        {details.items.map((item) => 
                            <div key={item.id}>
                                {(item.userId===details.userId) ? <p className='bring-me' >{item.itemName}</p> : <></>}
                            </div>
                        )}
                    </div>
                )} */}
        </div>
        )
    }

    return (
            <div>
                <PastEvent isOver={isInThePast(details.eventDate)}/>
            </div>
    )
}

export default EventCard