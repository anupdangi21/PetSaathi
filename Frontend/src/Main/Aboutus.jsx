import React from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"
import image from "../Images/PetTrain2.jpeg"
import About1 from "../Images/multiple_users.png"
import About2 from "../Images/img.png"
import About3 from "../Images/About-2.jpeg"
import About4 from "../Images/rg.png"


const Aboutus = () => {
  return (
    <div className=' bg-orange-100'>
        <header >
            <Navbar />
        </header>
        <main className='bg-orange-100'>
            <div className='text-center max-h-100 max-w-100 mt-0'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-black   mt-4'>About us</h1>
                <div className=' w-100 text-gray-500 dark:text-white-400 rounded-lg dark:bg-orange-100 ml-8 mr-8 mb-8'>
                  <p className='my-4 text-lg '>Its now our responsibilities about your pets</p>
                  
                  <div className='flex justify-end mr-8 '>
                  <p className=' text-center ml-8 mr-12 text-lg ' style={{ lineHeight: '2', textAlign: 'justify' }}>
                       Welcome to PetSaathi, the ultimate multi-vendor platform designed specifically for pet lovers! We connect passionate pet owners with a diverse range of trusted vendors offering everything from premium pet food and toys to grooming services and accessories. Our mission is to provide a one-stop-shop for all your pet needs while supporting small businesses and entrepreneurs in the pet industry. Explore our marketplace, discover unique products, and join a community that shares your love for pets!
                  </p>                    
                  <img src={image} className='h-96 w-100 rounded-lg mb-8 '></img>
                  </div>
                </div>
            </div>
            
              <div className="text-center text-2xl font-bold dark:text-black mt-10 bg-orange rounded-lg ml-8 mr-8"> Why choose us
                <div className='grid grid-cols-3 gap-4 mt-8 h-94'>
                  <div className='rounded-full bg-white-200 w-96 ml-8 h-96 '>
                    <h1 className='text-center ml-8'>multiple vendor</h1>
                    <img src={About1} className='rounded-full w-80 h-80 ml-8 mt-6'></img>
                    <h2 className='text-center ml-8 mt-4'>100+ vendors</h2>
                  </div>
                  <div className='rounded-full bg-white-200 w-96 ml-8 h-96'>
                    <h1 className='text-center ml-8'>multiple service in one</h1>
                    <img src={About2} className='rounded-full w-80 h-80 ml-12 mt-6' />
                    <h2 className='text-center ml-8 mt-4'>100+ happy vendors</h2>
                  </div>
                  <div className='rounded-full bg-white-200 w-96 ml-8'>
                  <h1 className='text-center ml-8'>Happy customers and pets</h1>
                    <img src={About4} className='rounded-full w-80 h-80 ml-12 mt-6'/>
                    <h2 className='text-center ml-8 mt-4'>100+ happy customers</h2>
                  </div>
                </div>
              </div>
              <div className="mt-4 ml-10 mb-4 rounded-lg">
                <div className="mt-4 ml-8">
                  <h1 className="text-center text-3xl font-bold dark:text-black mt-16">
                    Submit a query
                  </h1>
                </div>

                <div className="flex flex-wrap mt-8 items-start">
                  {/* Image Section */}
                  <div className="flex-shrink-0 ml-8">
                    <img
                      src={About3}
                      className="h-96 w-100 rounded-lg"
                      alt="About us"
                    />
                  </div>

                  {/* Text and Form Section */}
                  <div className="ml-8 mt-4 flex-grow">
                    <h2 className="text-2xl min-h-24 text-left mb-6">Help us improve</h2>
                    <form className="w-full max-w-sm">
                      <div className="mb-4">
                        <label
                          className="block text-gray-500 font-bold mb-2"
                          htmlFor="inline-full-name"
                        >
                          Area for improvement
                        </label>
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="inline-full-name"
                          type="text"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-500 font-bold mb-2"
                          htmlFor="inline-suggestion"
                        >
                          Your suggestion
                        </label>
                        <textarea
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="inline-suggestion"
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
          </main>
      <footer >
        <Footer />
      </footer>
    </div>
  )
}

export default Aboutus
