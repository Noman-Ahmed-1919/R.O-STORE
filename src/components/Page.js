import React from 'react'
import {  NavLink } from 'react-router-dom'

const Page= () => {
  return (
    <div className='fourtofour'>
      <h1>404</h1>
      <h2 >OOPS! Page Not Found</h2>

      <div style={{marginTop:"30px"}}>
      <NavLink to="/" className='btnpage'>
      Go Back
      </NavLink>
      </div>
     
    </div>
  )
}

export default Page
