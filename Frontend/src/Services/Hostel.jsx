import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from "../Components/foot"

const Hostel = () => {
  const services = [
    {
      id: 1,
      name: 'Pet Hostel by vendor 1',
      description: 'Comfortable and spacious accommodations for your pets.',
    }
  ];
  return (
    <div className='container'>
      <header>
        <Navbar />
      </header>
      <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">List of hostel services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default Hostel
