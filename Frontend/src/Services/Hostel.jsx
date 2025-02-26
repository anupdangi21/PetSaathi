import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from "../Components/foot"

const Hostel = () => {

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">List of hostel services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-lg shadow-md h-80">
              hahas
            </div>

        </div>
      </div>
    </main>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default Hostel
