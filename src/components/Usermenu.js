import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <>


    <div className='text-center'>
    
    <div className="list-group">
    
    <h4>DASHBOARD</h4>
      <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">PROFILE</NavLink>
      <NavLink to="/dashboard/user/Orders" className="list-group-item list-group-item-action">ORDERS</NavLink>
    
    </div>
    
    </div>
       
        </>
  )
}

export default Usermenu
