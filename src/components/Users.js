import React from 'react'
import Adminmenu from './Adminmenu'
import Header from './Header'


const Users = () => {
  return (
    <>
              <Header/>

<div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <Adminmenu/>

        </div>

        <div className='col-md-9'>
            <h1>All Users</h1>

        </div>

    </div>

</div>      
    </>
  )
}

export default Users
