const EventDetailsSticky.js = () => {
    return (
        <div className='uh flex-column'>

        <div id='uh'>Box</div>
        <h2>{eventDetails?.eventName}</h2>
        <div className="uh share-deets">
        {!isOver && (
            <div>
            {sharing && <ShareLink />}
            <button
                className="share-event-button"
                type="button"
                onClick={() => {
                sharing ? setSharing(false) : setSharing(true)
                }}
            >
                Share?
            </button>
            </div>
        )}
        </div>
        </div>
    )
}

export default EventDetailsSticky