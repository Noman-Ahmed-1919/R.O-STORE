import React from 'react'
import Usermenu from './Usermenu'
import Header from './Header'
import Footer from './Footer'


const Profile = () => {
  return (
    <>
      
<Header/>

      <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>

<Usermenu/>
        </div>

        <div className='col-md-9'>
            <h1>Your Profile</h1>

        </div>
         
    </div>

</div>

<Footer/>
    </>
  )
}

export default Profile
