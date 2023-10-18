import { useState, useEffect } from 'react'
import Avatar from 'boring-avatars'
import {
  GetListItemsForEvent,
  AddItem,
  DeleteItem
} from '../services/ItemServices'

const ItemsList = ({ user, eventId, isOver }) => {
  const [items, setItems] = useState([])
  const [addItem, setAddItem] = useState()

  const retrieveItems = async () => {
    const items = await GetListItemsForEvent(eventId)
    if (items) {
      setItems(items)
    }
  }

  const deleteItem = async (itemId) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      await DeleteItem(itemId)
    }
    retrieveItems()
  }

  useEffect(() => {
    if (user) retrieveItems()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await AddItem(addItem)
    setAddItem(null)
    retrieveItems()
  }

  const handleChange = (event) => {
    setAddItem({
      [event.target.id]: event.target.value,
      userId: user?.id,
      eventId: eventId
    })
  }

  return (
    <div>
      {items?.map((item) => (

        <div key={item.id} className="item-listing">
          <div className='avatar-container'>
          <Avatar
            size={40}
            name={item.userItems.name}
            variant="beam"
            colors={['#F9DED3', '#FDD1B6', '#FAB4B6', '#C7B6BE', '#89ABB4']}
          />
          </div>
          <p id="item-listing-content">
            <span className='bold'>{item.userItems.name}</span> is bringing {item.itemName}
          </p>
          {item.userId === user.id && !isOver ? <button className='delete-item-btn' onClick={()=> deleteItem(item.id)}>X</button> : <></>}
        </div>
      ))} 
        {!isOver &&
        <form onSubmit={handleSubmit}>
          <div className='flex-row'>
            <input
            type="text"
            id="itemName"
            placeholder='What are you bringing?'
            value={addItem?.itemName || ''}
            onChange={handleChange}
            />
            {/* <button id='add-btn'type="submit">Add</button> */}
      </div>
        </form>}
      </div>
  )
}

export default ItemsList
