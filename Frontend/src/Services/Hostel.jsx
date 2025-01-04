import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from "../Components/foot"

const Hostel = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div>
        <h1> this is the hostel page</h1>
        <footer>
            <Footer />
        </footer>
      </div>
    </div>
  )
}

export default Hostel
