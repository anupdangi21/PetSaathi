import React from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"

const Tracking = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className='max-w-7xl mx-auto px-4 py-8'>
        this is tracking
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Tracking
