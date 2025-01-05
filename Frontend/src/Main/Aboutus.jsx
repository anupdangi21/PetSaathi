import React from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"
import image from "../Images/PetTrain2.jpeg"
import About1 from "../Images/about-1.png"
import About2 from "../Images/PetTrain.jpeg"
import About3 from "../Images/About-2.jpeg"
import About4 from "../Images/rg.png"

const Aboutus = () => {
  return (
    <div className='container'>
        <header >
            <Navbar />
        </header>
        <main>
            <div className='text-center max-h-100 max-w-100 dark:bg-white-800 mr-8'>dw
                <h1 className='text-3xl font-bold text-gray-900 dark:text-black '>About us</h1>
                <div className='h-96 w-100 text-gray-500 dark:text-white-400 rounded-lg shadow-md dark:bg-slate-50 ml-8 hover:bg-stone-50 '>
                  <p className='my-4 text-lg '>Its now our responsibilities about your pets</p>
                  <div className='flex justify-end mr-8 '>
                    <img src={image} className='h-96 w-100 rounded-lg mb-8'></img>
                  </div>
                </div>
            </div>
            <div>
              <div className="text-center text-2xl font-bold dark:text-black mt-10"> Why choose us
                <div className='grid grid-cols-3 gap-4 mt-4 h-94'>
                <div className='rounded-full bg-white-200 w-96 ml-8 '>
                  <h1 className='text-center'>multiple vendor</h1>
                  <img src={About1}></img>
                </div>
                <div className='rounded-full bg-gray-200 w-96 ml-8'>
                  <h1>multiple service in one</h1>
                  <img src={About2} />
                  </div>
                <div className='rounded-full bg-gray-200 w-96 ml-8'>
                  multiple service in one
                  <img src={About4} />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 ml-10 mb-4 rounded-lg'>
              <div className='mt-4 ml-8'>
                <h1 className='text-center text-3xl font-bold dark:text-black mt-8'>Submit a query</h1>
              </div>
              <div className=''>
                <img src={About3} className='h-96 w-100 rounded-lg' ></img>
              </div>
            </div>
        </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Aboutus
