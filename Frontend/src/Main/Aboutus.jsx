import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"
import image from "../Images/PetTrain2.jpeg"
import About1 from "../Images/multiple_users.png"
import About2 from "../Images/img.png"
import About3 from "../Images/About-2.jpeg"
import About4 from "../Images/rg.png"

const Aboutus = () => {
  const [formData, setFormData] = useState({
    areaForImprovement: '',
    suggestion: ''
  })

  const userData = JSON.parse(localStorage.getItem("user_data")) || {}
  const user = userData?.user || {}

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const reviewData = {
        username: user.username || 'Anonymous',
        email: user.email || '',
        areaforimprovement: formData.areaForImprovement,
        suggestion: formData.suggestion
      }

      const response = await axios.post('http://localhost:3000/websitereview', reviewData)

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Thank You!',
          text: 'Your feedback has been submitted successfully!',
          confirmButtonColor: '#f97316'
        })
        setFormData({ areaForImprovement: '', suggestion: '' })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.message || 'Failed to submit feedback',
        confirmButtonColor: '#f97316'
      })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='min-h-screen bg-orange-100'>
      <Navbar />

      <main className='mx-auto px-4 sm:px-6 lg:px-2'>
        {/* Hero Section */}
        <section className='py-6'>
          <div className='max-w-6xl mx-auto'>
            <h1 className='text-4xl font-bold text-gray-800 text-center mb-8'>
              About <span className='text-orange-600'>PetSaathi</span>
            </h1>
            
            <div className='flex flex-col lg:flex-row items-center gap-8 bg-orange-100 rounded-2xl p-6 shadow-md'>
              <div className='lg:w-1/2'>
                <img 
                  src={image} 
                  alt='Pet Training' 
                  className='w-full h-96 object-cover rounded-xl'
                />
              </div>
              <div className='lg:w-1/2'>
                <p className='text-gray-600 text-lg leading-relaxed mb-6'>
                  Welcome to PetSaathi, the ultimate multi-vendor platform designed specifically for pet lovers! 
                  We connect passionate pet owners with a diverse range of trusted vendors offering everything 
                  from premium pet food and toys to grooming services and accessories.
                </p>
                <p className='text-gray-600 text-lg leading-relaxed'>
                  Our mission is to provide a one-stop-shop for all your pet needs while supporting small 
                  businesses and entrepreneurs in the pet industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-6'>
          <div className="text-center text-2xl font-bold dark:text-black mt-10 bg-orange rounded-lg ml-8 mr-8"> 
            <h1 className='text-4xl font-bold text-gray-800 text-center mb-8'>
              Why <span className='text-orange-600'>PetSaathi</span>
            </h1>
            <div className='grid grid-cols-3 gap-4 mt-8 h-94'>
              <div className='rounded-full bg-white-200 w-96 ml-8 h-96 '>
                <h1 className='text-center ml-8'>Multiple Vendors</h1>
                <img src={About1} className='rounded-full w-80 h-80 ml-8 mt-6' alt="Vendors" />
                <h2 className='text-center ml-8 mt-4'>100+ vendors</h2>
              </div>
              <div className='rounded-full bg-white-200 w-96 ml-8 h-96'>
                <h1 className='text-center ml-8'>Multiple Services</h1>
                <img src={About2} className='rounded-full w-80 h-80 ml-12 mt-6' alt="Services" />
                <h2 className='text-center ml-8 mt-4'>100+ happy vendors</h2>
              </div>
              <div className='rounded-full bg-white-200 w-96 ml-8'>
                <h1 className='text-center ml-8'>Happy Customers</h1>
                <img src={About4} className='rounded-full w-80 h-80 ml-12 mt-6' alt="Customers" />
                <h2 className='text-center ml-8 mt-4'>100+ happy customers</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className='py-6'>
          <div className='max-w-6xl mx-auto bg-orange-100 rounded-2xl shadow-md p-8'>
            <div className='flex flex-col lg:flex-row gap-8'>
              <div className='lg:w-1/2'>
                <img 
                  src={About3} 
                  alt='Contact Us' 
                  className='w-full h-full object-cover rounded-xl'
                />
              </div>
              
              <div className='lg:w-1/2'>
                <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                  Help Us Improve
                </h2>
                
                <form className='space-y-6' onSubmit={handleSubmit}>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                      Area for Improvement
                    </label>
                    <input
                      type='text'
                      name="areaForImprovement"
                      value={formData.areaForImprovement}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition'
                      placeholder='What can we improve?'
                      required
                    />
                  </div>
                  
                  <div>
                    <label className='block text-gray-700 font-medium mb-2'>
                      Your Suggestion
                    </label>
                    <textarea
                      rows='4'
                      name="suggestion"
                      value={formData.suggestion}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition'
                      placeholder='Your valuable suggestions...'
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type='submit'
                    className='w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors'
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Aboutus