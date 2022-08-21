import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h2>Error</h2>
      <p>Page Not found</p>
      <Link to='/'>Home</Link>
    </div>
  )
}

export default NotFound
