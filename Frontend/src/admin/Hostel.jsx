import React, { useState, useEffect } from 'react';
import Aside from "../Components/aside"
import { 
    BadgePlus,
    TrendingUp,
} from 'lucide-react';



const HostelAdmin = () => {

        const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen bg-gray-50 flex">
            <aside>
                <Aside />
            </aside>
            <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 ">Welcome to hostel Dashboard</h2>
                    <h3 className=" grid ml text-2xl font-semibold text-gray-800 place-items-end mr-12">Upload a pet
                    <button
                    // onClick={handleAddPet}
                    className=" grid bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 place-items-end m-8">
                        <BadgePlus /> 
                    </button>
                    </h3>
                    <p className="mt-2 text-gray-600 ">Click on the + button to start listing your pets.</p>
                </div>
            </main>
    </div>
  )
}

export default HostelAdmin
