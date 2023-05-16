import React, { useState } from 'react'
import './AddCategory.scss'
import newRequest from '../../utils/newRequest'

const AddCategory = () => {
    const [category, setCategory] = useState()
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newRequest.post("/admin/newcat",{category})
            console.log(res.data)
            setError(null)
            setMessage('New Category added')
        } catch(err) {
            setError(err.response.data)
            setMessage(null)
        }
    }
  return (
    <div className='newcat'>
      <form onSubmit={handleSubmit}>
        <h1>Category addition portal</h1>
        <label>Category</label>
        <input
          name="cat"
          type="text"
          placeholder="electrician"
          onChange={(e) => {
            setMessage(null)
            setError(null)
            setCategory(e.target.value)}}
        />
        <button type="submit">Add</button>
        {error && error}
        {message && message}
      </form>
    </div>
  )
}

export default AddCategory
