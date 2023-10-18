import { useEffect, useState } from 'react'
import { GetCommentsForEvent, CreateComment } from '../services/CommentServices'
import Avatar from 'boring-avatars'

const Comments = ({ user, eventId }) => {
  const initialState = {
    userId: user.id,
    eventId: eventId,
    comment: ''
  }

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState(initialState)

  const handleComments = async () => {
    const data = await GetCommentsForEvent(eventId)
    if (data) {
      setComments(data)
    }
  }

  useEffect(() => {
    handleComments()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await CreateComment(newComment)
    setNewComment(initialState)
    handleComments()
  }

  const handleChange = (event) => {
    setNewComment({ ...newComment, [event.target.id]: event.target.value })
  }

  return comments.length > 0 ? (
    <div>
      {comments.map((comment) => (
        <div className="flex-row" key={comment.id}>
          <div className='avatar-container'>
            <Avatar
              size={40}
              name={comment.author.name}
              variant="beam"
              colors={['#F9DED3', '#FDD1B6', '#FAB4B6', '#C7B6BE', '#89ABB4']}
            />
        </div>
            <p><span className='bold'>{comment.author.name}</span> said {comment.comment}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} style={{width: '100%'}}>
        <input
          type="text"
          id="comment"
          placeholder='Leave a comment'
          value={newComment.comment}
          onChange={handleChange}
        />
      </form>
    </div>
  ) : (
    <div>
      <form onSubmit={handleSubmit} style={{width: '100%'}}>
        <input
          type="text"
          id="comment"
          placeholder='Leave a comment'
          value={newComment.comment}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default Comments
