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
    <div className='container bg-orange-100'>
        <header >
            <Navbar />
        </header>
        <main className='bg-orange-100'>
            <div className='text-center max-h-100 max-w-100 mt-0'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-black   mt-4'>About us</h1>
                <div className=' w-100 text-gray-500 dark:text-white-400 rounded-lg shadow-md dark:bg-slate-50 ml-8 mr-8 mb-8 hover:bg-stone-50 '>
                  <p className='my-4 text-lg '>Its now our responsibilities about your pets</p>
                  <div className='flex justify-end mr-8 '>
                    <img src={image} className='h-96 w-100 rounded-lg mb-8 '></img>
                  </div>
                </div>
            </div>
            
              <div className="text-center text-2xl font-bold dark:text-black mt-10 bg-white rounded-lg ml-8 mr-8"> Why choose us
                <div className='grid grid-cols-3 gap-4 mt-8 h-94'>
                  <div className='rounded-full bg-white-200 w-96 ml-8h-96 '>
                    <h1 className='text-center ml-8'>multiple vendor</h1>
                    <img src={About1} className='rounded-full w-80 h-80 ml-20 mt-6'></img>
                  </div>
                  <div className='rounded-full bg-white-200 w-96 ml-8 h-96'>
                    <h1 className='text-center'>multiple service in one</h1>
                    <img src={About2} className='rounded-full w-80 h-80 ml-12 mt-6' />
                  </div>
                  <div className='rounded-full bg-white-200 w-96 ml-8'>
                    Happy customers and pets
                    <img src={About4} className='rounded-full w-80 h-80 ml-12 mt-6'/>
                  </div>
                </div>
              </div>
              <div className='mt-4 ml-10 mb-4 rounded-lg'>
                <div className='mt-4 ml-8'>
                  <h1 className='text-center text-3xl font-bold dark:text-black mt-16'>Submit a query</h1>
                </div>
                <div className='inline-flex'>
                  <img src={About3} className='h-96 w-100 rounded-lg ml-8 mt-8' ></img>
                  <h2 className=' text-2xl mt-8 ml-10'>Help us improve</h2>
                </div>
                <form class="w-full max-w-sm mt-20 mr-20 inline-flex">
                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Area for improvement
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" type="text" />
                    </div>
                  </div>
                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-suggestion">
                        Your suggestion
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-suggestion" type="suggestion" />
                    </div>
                  </div>
                </form>
              </div>    
            
        </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Aboutus
