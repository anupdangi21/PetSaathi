import React from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"
import Cross from "../Images/Cross.png"
// import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
  const navigate = useNavigate()
  // const [search]=useSearchParams()
    // const info=search.get('data')
    // let decodeinfo = atob(info)
    // console.log(info)
    // console.log(decodeinfo)
    // let newInfo = JSON.parse(decodeinfo)
    // console.log(newInfo)

    const handleCancel=()=>{
      navigate("/")
    }
  return (
<div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-white">
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-8">
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl shadow-lg p-8 w-full max-w-md mx-4">
            <form className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                Payment Failed
              </h1>
              <div>
                <img src={Cross} alt="" className='w-64 h-64 ml-16'/>
              </div>

              <div className="space-y-4">
                <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    <h1 className='text-lg ml-16'>Payment Status: Failed</h1>
                    <h1 className='mt-4 text-lg ml-16'>Payment Amount: NaN</h1>
                  </label>
                </div>
                <button onClick={handleCancel} className='ml-32 px-10 py-2 bg-orange-200 hover:bg-orange-300'>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Failure
