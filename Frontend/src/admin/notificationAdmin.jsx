import React from 'react'
import Aside from "../Components/aside.jsx"

const NotificationAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
    <aside>
        <Aside />
    </aside>
      <main className="w-full md:w-[1000px] mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 ">Your All Notifications are displayed below</h2>
      </main>
    </div>
  )
}

export default NotificationAdmin
