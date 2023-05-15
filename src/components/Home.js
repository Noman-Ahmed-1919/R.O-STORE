import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Page from './Page'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contextapi/contextapi';

const Home = () =>{
const [auth, setAuth] = useAuth()

  return (
    <>
      

<Header/>
{/* <Page/> */}

<pre>{JSON.stringify(auth, null, 4)}</pre>
<Footer/>
<ToastContainer />
    </>
  )
}

export default Home
