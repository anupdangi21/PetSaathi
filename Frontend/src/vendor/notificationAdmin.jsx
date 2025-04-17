import React, { useState, useEffect, useContext } from 'react'; // Add useContext here
import { AppContext } from "../Context/AppContext.jsx"; 
import Aside from "../Components/aside.jsx"
import { Navigate, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const NotificationAdmin = () => {
  const navigate = useNavigate()

  //fetching the data from localstorage and the api that matches the vendor logged in email and appi email
  const { setNotificationCount } = useContext(AppContext);
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
    setNotificationCount(0);
  }, []);
// notification indicator
useEffect(() => {
  const total = 
    adoptions.length + 
    grooming.length + 
    training.length + 
    hostel.length + 
    groomingrating.length + 
    trainingrating.length + 
    hostelrating.length;
  setNotificationCount(total);
}, [adoptions, grooming, training, hostel, groomingrating, trainingrating, hostelrating]);

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

  const combinedNotifications = [
    ...adoptions.map(n => ({ ...n, type: 'adoption' })),
    ...grooming.map(n => ({ ...n, type: 'grooming' })),
    ...training.map(n => ({ ...n, type: 'training' })),
    ...hostel.map(n => ({ ...n, type: 'hostel' })),
    ...groomingrating.map(n => ({ ...n, type: 'groomingrating' })),
    ...trainingrating.map(n => ({ ...n, type: 'trainingrating' })),
    ...hostelrating.map(n => ({ ...n, type: 'hostelrating' })),
  ];

  // Sort notifications by date (newest first)
  const sortedNotifications = combinedNotifications.sort((a, b) => 
    new Date(b.bookedAt) - new Date(a.bookedAt)
  );

  const typeToRoute = {
    adoption: '/dashboard/notification/adoptionnotification',
    grooming: '/dashboard/notification/groomingnotification',
    training: '/dashboard/notification/trainingnotification',
    hostel: '/dashboard/notification/hostelnotification',
    groomingrating: '/dashboard/notification/groomingratingnotification',
    trainingrating: '/dashboard/notification/trainingratingnotification',
    hostelrating: '/dashboard/notification/hostelratingnotification',
  };

  const handleViewDetails = (type) => {
    navigate(typeToRoute[type]);
  };

  const getNotificationContent = (notification) => {
    switch(notification.type) {
      case 'adoption':
        return `Hello vendor, ${notification.fullname} has just viewed your adoption post for 
                ${notification.petname} and is interested in adopting your pet. The booked date to 
                visit your store is ${notification.date}.`;
      case 'grooming':
        return `Hello vendor, ${notification.fullname} has booked your grooming service for 
                package type ${notification.selectedpackage}. Check-in date: ${notification.date}.`;
      case 'training':
        return `Hello vendor, ${notification.fullname} has booked your training service for 
                package type ${notification.selectedpackage}. Check-in date: ${notification.date}.`;
      case 'hostel':
        return `Hello vendor, ${notification.fullname} has booked your hostel service for 
                package type ${notification.selectedpackage}. Check-in date: ${notification.date}.`;
      case 'groomingrating':
        return `Hello vendor, ${notification.fullname} reviewed your grooming service with 
                ${notification.stars} stars. Feedback: ${notification.feedback}`;
      case 'trainingrating':
        return `Hello vendor, ${notification.fullname} reviewed your training service with 
                ${notification.stars} stars. Feedback: ${notification.feedback}`;
      case 'hostelrating':
        return `Hello vendor, ${notification.fullname} reviewed your hostel service with 
                ${notification.stars} stars. Feedback: ${notification.feedback}`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
    <aside>
      <Aside />
    </aside>
    <main className="ml-64">
      <div className="w-full md:w-[1250px] mx-auto bg-white rounded-lg shadow-lg min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 pt-10 pl-4">
          Your All Notifications
        </h2>

        {sortedNotifications.map((notification, index) => (
          <div key={`${notification.type}-${index}`} className="rounded-lg bg-zinc-100 mt-2 ml-4 p-4">
            <div className='flex justify-between items-center'>
              <h2 className="font-bold">
                Notification for {notification.type.replace(/rating$/i, '')}
                {notification.type.includes('rating') ? ' review' : ''}
              </h2>
              <p className='text-sm'>
                {moment(notification.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
            <p className="mt-2.5">
              {getNotificationContent(notification)}
            </p>
            <button 
              className='bg-white justify-end w-24 h-8 mt-2'
              onClick={() => handleViewDetails(notification.type)}
            >
              View Details
            </button>
          </div>
        ))}

        {sortedNotifications.length === 0 && !loading && (
          <p className="mt-4 ml-4 text-gray-700">No notifications found</p>
        )}
      </div>
    </main>
  </div>
);
};

export default NotificationAdmin