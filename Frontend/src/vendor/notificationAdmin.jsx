import React, { useState, useEffect } from 'react';
import Aside from "../Components/aside.jsx"
import { Navigate, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const NotificationAdmin = () => {
  const navigate = useNavigate()

  //fetching the data from localstorage and the api that matches the vendor logged in email and appi email

  const [adoptions, setAdoptions] = useState([]);
  const [grooming, setGrooming] = useState([]);
  const [training, setTraining]=useState([])
  const [hostel, setHostel]= useState([])
  const [groomingrating, setGroomingrating]=useState([])
  const [trainingrating, setTrainingrating]=useState([])
  const [hostelrating, setHostelrating]=useState([])
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
  
    fetch("http://localhost:3000/booktrain")
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
  
    fetch("http://localhost:3000/groomingreview")
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

        const userGroomingsRating = data.data.filter(
          (groomingrating) => groomingrating.vendoremail === userEmail
        );
  
        // console.log("Filtered Grooming:", userGroomings);
        setGroomingrating(userGroomingsRating);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error loading adoption data");
        setLoading(false);
      });
  }, []);

  //yo trainingrating ko
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
  
    fetch("http://localhost:3000/trainingreview")
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

        const userTrainingRating = data.data.filter(
          (trainingrating) => trainingrating.vendoremail === userEmail
        );
  
        // console.log("Filtered Grooming:", userGroomings);
        setTrainingrating(userTrainingRating);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error loading adoption data");
        setLoading(false);
      });
  }, []);

  // yo chai hostel ko
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
  
    fetch("http://localhost:3000/hostelreview")
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

        const userHostelRating = data.data.filter(
          (hostelrating) => hostelrating.vendoremail === userEmail
        );
  
        // console.log("Filtered Grooming:", userGroomings);
        setHostelrating(userHostelRating);
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

  const viewGroomingRating =()=>{
    navigate("/dashboard/notification/groomingratingnotification")
  }

  const viewTrainingRating =()=>{
    navigate("/dashboard/notification/trainingratingnotification")
  }

  const viewHostelRating =()=>{
    navigate("/dashboard/notification/hostelratingnotification")
  }



  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside>
        <Aside />
      </aside>
      <main className="ml-64">
        <div className="w-full md:w-[1250px] mx-auto bg-white rounded-lg shadow-lg min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-800 pt-10 pl-4">
            Your All Notifications are displayed below
          </h2>

          {adoptions && adoptions.length > 0 ? (
            adoptions.map((adoption, index) => (
              <div key={adoption._id || index} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
              <div className='flex justify-between items-center'>
                <h2 className="font-bold">Notification for {adoption.petname} adoption</h2>
                <p className='text-sm'>
                    {moment(adoption.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
                  </p>
              </div>               
                <p className="mt-2.5">
                  Hello vendor, {adoption.fullname} has just viewed your adoption post for{" "}
                  {adoption.petname} and is interested in adopting your pet. The booked date to
                  visit your store is {adoption.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-8 mt-2 '
                  onClick= {viewAdoption}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

        {/* grooming ko notification */}
          {grooming && grooming.length > 0 ? (
            grooming.map((grooming, index) => (
              <div key={grooming._id || index} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
              <div className='flex justify-between items-center'>
                <h2 className="font-bold">Notification for grooming request</h2>
                <p className='text-sm'>
                    {moment(grooming.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
                  </p>
              </div>
                <p className="mt-2.5">
                  Hello vendor, {grooming.fullname} has just viewed your pet grooming service for package type {grooming.selectedpackage}
                  {grooming.petname} and booked the service. The booked date to
                  check-in is: {grooming.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-2 '
                  onClick= {viewGrooming}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

          {/* training ko notification */}
          {training && training.length > 0 ? (
            training.map((training, index) => (
              <div key={training._id || index} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
                <div className='flex justify-between items-center'>
                  <h2 className="font-bold">Notification for training request</h2>
                  <p className='text-sm'>
                    {moment(training.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
                  </p>
                </div>
                
                <p className="mt-2.5">
                  Hello vendor, {training.fullname} has just viewed your pet traning service for package type {training.selectedpackage}
                  {training.petname} and booked the service. The booked date to
                  check-in is: {training.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-2 '
                  onClick= {viewTraining}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}
          
          {/* hostel ko notification */}
          {hostel && hostel.length > 0 ? (
            hostel.map((hostel, index) => (
              <div key={hostel._id || index} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
              <div className='flex justify-between items-center'>
                <h2 className="font-bold">Notification for hostel request</h2>
                <p className='text-sm'>
                    {moment(hostel.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
                  </p>
              </div>                
                <p className="mt-2.5">
                  Hello vendor, {hostel.fullname} has just viewed your pet hostel service for package type {hostel.selectedpackage}
                  {hostel.petname} and booked the service. The booked date to
                  check-in is: {hostel.date}.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-2 '
                  onClick= {viewHostel}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

          {/* grooming rating ko notification */}
          {groomingrating && groomingrating.length > 0 ? (
            groomingrating.map((groomingrating, index) => (
              <div key={groomingrating._id || index} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
              <div className='flex justify-between items-center'>
                <h2 className="font-bold">Notification for grooming rating</h2>
                <p className='text-sm'>
                    {moment(groomingrating.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
                  </p>
              </div>                
                <p className="mt-2.5">
                  Hello vendor, {groomingrating.fullname} has just reviewed your pet grooming service for package type {groomingrating.selectedpackage}.
                  He/Her has given {groomingrating.stars} stars and also has suggestions.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-2 '
                  onClick= {viewGroomingRating}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

          {/* training rating ko notification */}
          {trainingrating && trainingrating.length > 0 ? (
            trainingrating.map((trainingrating, index) => (
              <div key={trainingrating._id || index} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
              <div className='flex justify-between items-center'>
                <h2 className="font-bold">Notification for training rating</h2>
                <p className='text-sm'>
                    {moment(trainingrating.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
                  </p>
              </div>                
                <p className="mt-2.5">
                  Hello vendor, {trainingrating.fullname} has just reviewed your pet grooming service for package type {trainingrating.selectedpackage}.
                  He/Her has given {trainingrating.stars} stars and also has suggestions.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-2 '
                  onClick= {viewTrainingRating}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="mt-4 ml-4 text-gray-700"></p>
          )}

          {/* grooming rating ko notification */}
          {hostelrating && hostelrating.length > 0 ? (
            hostelrating.map((hostelrating, index) => (
              <div key={hostelrating._id || index} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
              <div className='flex justify-between items-center'>
                <h2 className="font-bold">Notification for Hostel rating</h2>
                <p className='text-sm'>
                    {moment(hostelrating.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
                  </p>
              </div>                
                <p className="mt-2.5">
                  Hello vendor, {hostelrating.fullname} has just reviewed your pet hostel service for package type {hostelrating.selectedpackage}.
                  He/Her has given {hostelrating.stars} stars and also has suggestions.
                </p>
                <button className=' bg-white justify-end w-24 h-10 mt-2 '
                  onClick= {viewHostelRating}
                >
                  View Details
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