import React from 'react'
import Usermenu from './Usermenu'
import Header from './Header'
import Footer from './Footer'

const Oders = () => {
  return (
    <>
      
<Header/>


<div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>

<Usermenu/>
        </div>

        <div className='col-md-9'>
            <h1>All Orders</h1>

        </div>
         
    </div>

</div>


<Footer/>

    </>
  )
}

export default Oders
