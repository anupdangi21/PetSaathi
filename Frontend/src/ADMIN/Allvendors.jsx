import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Adminaside from "../Components/Adminaside"

const Allvendors = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/registration')
          
          // Validate response structure
          if (Array.isArray(response.data)) {
            setUsers(response.data)
          } else if (Array.isArray(response.data.users)) {
            setUsers(response.data.users)
          } else if (Array.isArray(response.data.data)) {
            setUsers(response.data.data)
          } else {
            throw new Error('Unexpected API response structure')
          }
          
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
  
      fetchUsers()
    }, [])
  
    if (loading) {
      return (
        <div className="flex">
          <Adminaside />
          <div className="flex-1 text-center py-8">Loading users...</div>
        </div>
      )
    }
  
    if (error) {
      return (
        <div className="flex">
          <Adminaside />
          <div className="flex-1 text-center py-8 text-red-500">Error: {error}</div>
        </div>
      )
    }
  
    // Ensure users is always an array before mapping
    const userData = Array.isArray(users) ? users : []
  return (
    <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar */}
    <Adminaside />
    
    {/* Main Content */}
    <div className="flex-1 p-8 ml-64"> {/* Adjust ml-64 based on your sidebar width */}
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Registered Vendors</h1>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userData.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)
}
export default Allvendors
