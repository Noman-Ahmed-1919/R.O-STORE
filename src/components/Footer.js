import React from 'react'
import { Link } from 'react-router-dom'

const Footer =() => {
  return (
    <div className='footer'>
      
      <p className='text-center'>All Right Reserved R.O STORE</p>

      <p className='text-center mt-3'>
        <Link to="/about">About</Link>
        |
        <Link to="/contact">Contact</Link>
        |
        <Link to="/privacy">Privacy Policy</Link>

      </p>
    </div>
  )
}

export default Footer
