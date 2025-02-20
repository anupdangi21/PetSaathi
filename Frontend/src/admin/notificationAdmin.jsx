import React, { useState, useEffect } from 'react';
import Aside from "../Components/aside.jsx"

const NotificationAdmin = () => {

  //fetching the data from localstorage and the api that matches the vendor logged in email and appi email

  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    // Get user email from localStorage
    const userData = JSON.parse(localStorage.getItem("user_data"));
    console.log("User Data:", userData);
  
    if (!userData || !userData.user?.email) {
      setError("User not logged in or email missing");
      setLoading(false);
      return;
    }
  
    const userEmail = userData.user.email;
  
    fetch("http://localhost:3000/adoption")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
  
        // Check if data.data exists and is an array
        if (!data || !Array.isArray(data.data)) {
          console.error("Error: Expected an array but got:", data);
          setError("Unexpected data format");
          setLoading(false);
          return;
        }
  
        // Now filter correctly
        const userAdoptions = data.data.filter(
          (adoption) => adoption.vendoremail === userEmail
        );
  
        console.log("Filtered Adoptions:", userAdoptions);
        setAdoptions(userAdoptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error loading adoption data");
        setLoading(false);
      });
  }, []);
  



  // if (loading) {
  //  console.log("not found")
  // }

  // if (error) {
  //   console.log("error getting data")
  // }

  // if (adoptions.length === 0) {
  //   console.log("no adoption data")
  // }


  return (
    <div className="min-h-screen bg-gray-50 flex">
    <aside>
        <Aside />
    </aside>
      <main className="ml-60">
        <div className='w-full md:w-[1200px] mx-auto bg-white rounded-lg shadow-lg min-h-screen'>
      <h2 className="text-2xl font-semibold text-gray-800 pt-10 pl-4">Your All Notifications are displayed below</h2>
      {adoptions.map((adoption, index) => (
  <div key={adoption._id || index} className="rounded-lg bg-zinc-100 mt-4 ml-4">
    <h2 className="font-bold">Yei ho notification {adoption.petname}</h2>
    <p className="mt-4">
      Hello vendor, {adoption.fullname} has just viewed your adoption post for {adoption.petname} and is interested in adopting your pet. The booked date to visit your store is {adoption.date}.
    </p>
  </div>
))}

      {/* <div className='rounded-lg bg-zinc-100 mt-4 ml-4'>
        <h2 className='font-bold'>yei ho notification</h2>
        <p className='mt-4 '>hello vendor, customer 123 has just viewed your adoption post and interested on adopting your pet the booked date to visit your store is eti eti</p> 
      </div> */}
      </div>
      </main>
      
    </div>
  )
}

export default NotificationAdmin
