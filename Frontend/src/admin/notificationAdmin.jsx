import React, { useState, useEffect } from 'react';
import Aside from "../Components/aside.jsx"
import { Navigate, useNavigate } from 'react-router-dom';

const NotificationAdmin = () => {
  const navigate = useNavigate()

  //fetching the data from localstorage and the api that matches the vendor logged in email and appi email

  const [adoptions, setAdoptions] = useState([]);
  const [grooming, setGrooming] = useState([]);
  const [training, setTraining]=useState([])
  const [hostel, setHostel]= useState([])
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
        // console.log("Fetched Data:", data);
  
        // Check if data.data exists and is an array
        if (!data || !Array.isArray(data.data)) {
          console.error("Error: Expected an array but got:", data);
          setError("Unexpected data format");
          setLoading(false);
          return;
        }

        const userAdoptions = data.data.filter(
          (adoption) => adoption.vendoremail === userEmail
        );
  
        // console.log("Filtered Adoptions:", userAdoptions);
        setAdoptions(userAdoptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error loading adoption data");
        setLoading(false);
      });
  }, []);



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
  
    fetch("http://localhost:3000/bookgroom")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // console.log("Fetched Data k abrian ho?:", data);
  
        // Check if data.data exists and is an array
        if (!data || !Array.isArray(data.data)) {
          // console.error("Error: Expected an array but got:", data);
          setError("Unexpected data format");
          setLoading(false);
          return;
        }

        const userGroomings = data.data.filter(
          (grooming) => grooming.vendoremail === userEmail
        );
  
        // console.log("Filtered Grooming:", userGroomings);
        setGrooming(userGroomings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error loading adoption data");
        setLoading(false);
      });
  }, []);

  //useeffect of pet training
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
  
    fetch("http://localhost:3000/bookgroom")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // console.log("Fetched Data k abrian ho?:", data);
  
        // Check if data.data exists and is an array
        if (!data || !Array.isArray(data.data)) {
          // console.error("Error: Expected an array but got:", data);
          setError("Unexpected data format");
          setLoading(false);
          return;
        }

        const userTraining = data.data.filter(
          (training) => training.vendoremail === userEmail
        );
  
        // console.log("Filtered Grooming:", userGroomings);
        setTraining(userTraining);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error loading adoption data");
        setLoading(false);
      });
  }, []);
  

  //useeffect of pethsotel
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
  
    fetch("http://localhost:3000/bookhostel")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // console.log("Fetched Data k abrian ho?:", data);
  
        // Check if data.data exists and is an array
        if (!data || !Array.isArray(data.data)) {
          // console.error("Error: Expected an array but got:", data);
          setError("Unexpected data format");
          setLoading(false);
          return;
        }

        const userHostel = data.data.filter(
          (hostel) => hostel.vendoremail === userEmail
        );
  
        // console.log("Filtered Grooming:", userGroomings);
        setHostel(userHostel);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error loading adoption data");
        setLoading(false);
      });
  }, []);




  if (adoptions.length === 0) {
    console.log("no adoption data")
  }

  const viewAdoption = ()=>{
    navigate("/dashboard/notification/adoptionnotification")
  }

  const viewGrooming =()=>{
    navigate("/dashboard/notification/groomingnotification")
  }

  const viewTraining =()=>{
    navigate("/dashboard/notification/trainingnotification")
  }
  
  const viewHostel =()=>{
    navigate("/dashboard/notification/hostelnotification")
  }


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside>
        <Aside />
      </aside>
      <main className="ml-60">
        <div className="w-full md:w-[1200px] mx-auto bg-white rounded-lg shadow-lg min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-800 pt-10 pl-4">
            Your All Notifications are displayed below
          </h2>

          {adoptions && adoptions.length > 0 ? (
            adoptions.map((adoption, index) => (
              <div key={adoption._id || index} className="rounded-lg bg-zinc-100 mt-4 ml-4 p-4">
                <h2 className="font-bold">Notification for {adoption.petname}</h2>
                
                <p className="mt-4">
                  Hello vendor, {adoption.fullname} has just viewed your adoption post for{" "}
                  {adoption.petname} and is interested in adopting your pet. The booked date to
                  visit your store is {adoption.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-4 '
                  onClick= {viewAdoption}
                >
                  view all
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

        {/* grooming ko notification */}
          {grooming && grooming.length > 0 ? (
            grooming.map((grooming, index) => (
              <div key={grooming._id || index} className="rounded-lg bg-zinc-100 mt-4 ml-4 p-4">
                <h2 className="font-bold">Notification for grooming</h2>
                
                <p className="mt-4">
                  Hello vendor, {grooming.fullname} has just viewed your pet grooming service for package type {grooming.selectedpackage}
                  {grooming.petname} and booked the service. The booked date to
                  check-in is: {grooming.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-4 '
                  onClick= {viewGrooming}
                >
                  view all
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

          {/* training ko notification */}
          {training && training.length > 0 ? (
            training.map((training, index) => (
              <div key={training._id || index} className="rounded-lg bg-zinc-100 mt-4 ml-4 p-4">
                <h2 className="font-bold">Notification for Hostel</h2>
                
                <p className="mt-4">
                  Hello vendor, {training.fullname} has just viewed your pet hostel service for package type {training.selectedpackage}
                  {training.petname} and booked the service. The booked date to
                  check-in is: {training.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-4 '
                  onClick= {viewTraining}
                >
                  view all
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}
          
          {/* hostel ko notification */}
          {hostel && hostel.length > 0 ? (
            hostel.map((hostel, index) => (
              <div key={hostel._id || index} className="rounded-lg bg-zinc-100 mt-4 ml-4 p-4">
                <h2 className="font-bold">Notification for Hostel</h2>
                
                <p className="mt-4">
                  Hello vendor, {hostel.fullname} has just viewed your pet hostel service for package type {hostel.selectedpackage}
                  {hostel.petname} and booked the service. The booked date to
                  check-in is: {hostel.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-4 '
                  onClick= {viewHostel}
                >
                  view all
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

        </div>
      </main>
    </div>
  )
}

export default NotificationAdmin