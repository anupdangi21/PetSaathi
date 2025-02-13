import React from 'react'

const AdoptPetReservation = () => {
  return (
<div className="bg-white shadow-md rounded-lg p-4 min-h-[40vh] w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Reservation to reunite with your pet</h1>
            {/* onSubmit={handleSubmit} */}
            <form >
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            // onChange={(e) => setName(e.target.value)}
                        />
                        <i className="fa-solid fa-user absolute right-3 top-3 text-gray-400"></i>
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="fa-solid fa-lock absolute right-3 top-3 text-gray-400"></i>
                    </div>
                    <button
                        type="submit"
                        className="w-1/2 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Submit
                    </button>

                </div>
            </form>
        </div>
  )
}

export default AdoptPetReservation

