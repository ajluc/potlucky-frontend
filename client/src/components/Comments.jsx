import { useEffect, useState } from 'react'
import { GetCommentsForEvent, CreateComment } from '../services/CommentServices'

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
    // window.location.reload(false)
  }

  const handleChange = (event) => {
    setNewComment({ ...newComment, [event.target.id]: event.target.value })
  }

  return comments.length > 0 ? (
    <div>
      <h2>-----------------------------</h2>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <h5>{comment.author.username}</h5>
          <section className="comment-content">
            <p>{comment.comment}</p>
            {comment.createdAt === comment.updatedAt ? <b></b> : <b>edited</b>}
          </section>
          <section className="comment-date">
            <h6>{comment.createdAt}</h6>
          </section>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Write a comment...</label>
        <input
          type="text"
          id="comment"
          value={newComment.comment}
          onChange={handleChange}
        />
        <input type="submit" style={{ display: 'none' }} />
        {/*This ^ line comes from user193130 and their answer to this question. --> https://stackoverflow.com/questions/27807853/html5-how-to-make-a-form-submit-after-pressing-enter-at-any-of-the-text-inputs*/}
      </form>
    </div>
  ) : (
    <div>
      <h2>-----------------------------</h2>
      <h2>Write the first comment!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Write a comment...</label>
        <input
          type="text"
          id="comment"
          value={newComment.comment}
          onChange={handleChange}
        />
        <input type="submit" style={{ display: 'none' }} />
        {/*This ^ line comes from user193130 and their answer to this question. --> https://stackoverflow.com/questions/27807853/html5-how-to-make-a-form-submit-after-pressing-enter-at-any-of-the-text-inputs*/}
      </form>
    </div>
  )
}

export default Comments