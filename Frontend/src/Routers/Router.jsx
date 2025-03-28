import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import PrivateRoute from "./ProtectedRoute ";
import PrivateRouter from "./ProtectedRoute"
// import { AppContext } from "../Context/AppContext";
import Home from "../Main/App";
import Signin from "../Components/signin";
import Register from "../Components/register";
import About from "../Main/Aboutus";
import Marketplace from "../Main/market";
import Vregister from "../VendorRegistration/Vregister";
import Dashboard from "../admin/dashboard";
import Adoption from "../Services/Adoption";
import Hostel from "../Services/Hostel";
import Training from "../Services/PetTraining";
import Grooming from "../Services/Grooming"
import Lostfound from "../Services/lostfound";
import AdminAdoption from "../admin/Adoption"
import AddPet from "../admin/addPets"
import LostPet from "../Pages/Lost"
import FoundPet from "../Pages/Found"
import NotificationAdmin from "../admin/notificationAdmin"
import HostelAdmin from "../admin/Hostel";
import TrainingAdmin from "../admin/Training";
import Tracking from "../Pages/Tracking"
import UpdateProfile from "../Pages/cProfile"
import AdoptionNotification from "../Notifications/adoptionNotification"
import GroomingNotification from "../Notifications/groomingNotification"
import TrainingNotification from "../Notifications/trainingNotification"
import HostelNotification from "../Notifications/hostelNotification"
import GroomingRatingNotification from "../Notifications/groomingRatingNotification"
import HostelRatingNotification from "../Notifications/hostelRatingNotification"
import TrainingRatingNotification from "../Notifications/trainingRatingNotification"
import AddService from "../admin/addService";
import PetGroom from "../admin/petGroom"
import Addhostel from "../admin/addHostel"
import Addgrooming from "../admin/addGrooming"
import AddTraining from "../admin/addTraining"
import PaymentSuccess from "../Payment/Success"
import PaymentFailure from "../Payment/Failure.jsx"
import TrainingInfo from "../Services/ServicesInfo/TrainingInfo.jsx"
import GroomingInfo from "../Services/ServicesInfo/GroomingInfo.jsx"
import HostelInfo from "../Services/ServicesInfo/HostelInfo.jsx"

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/marketplace",
      element: <Marketplace />,
    },
    {
      path: "/dashboard",
      element: 
        <PrivateRouter>
          <Dashboard />
         </PrivateRouter>
    },
    {
      path: "/services/adoption",
      element: <Adoption />,
    },
    {
      path: "/services/hostel",
      element: <Hostel />,
    },
    {
      path: "/services/training",
      element: <Training />,
    },

    {
      path:"/services/grooming",
      element:<Grooming />
    },
    {
      path: "/services/lostfound",
      element: <Lostfound />,
    },
    {
      path: "/tracking",
      element: <Tracking />,
    },
    {
      path:"updateprofile",
      element:<UpdateProfile />,
    },

    {
      path: "/vendor/register",
      element: <Vregister />,
    },
    {
      path: "/payment/success",
      element: <PaymentSuccess />,
    },
    {
      path: "/payment/failure",
      element: <PaymentFailure />,
    },
    {
      path: "/services/training/pettraininginfo",
      element: <TrainingInfo />,
    },
    {
      path: "/services/grooming/petgroominginfo",
      element: <GroomingInfo />,
    },
    {
      path: "/services/hostel/pethostelinfo",
      element: <HostelInfo />,
    },

    {
      path:"/dashboard/adoption",
      element:(<PrivateRouter>
        <AdminAdoption />
      </PrivateRouter>) 
      
    },
    {
      path: "/dashboard/hostel",
      element: (
        <PrivateRouter>
        <HostelAdmin />
      </PrivateRouter>
      )
    },
    {
      path: "/dashboard/pet-training",
      element: (
      <PrivateRouter>
      <TrainingAdmin />
      </PrivateRouter>
      )
    },
    {
      path:"/dashboard/pet-grooming",
      element: (
        <PrivateRouter>
      < PetGroom/>
      </PrivateRouter>
    )
    },
    {
      path:"/dashboard/notification",
      element:(
        <PrivateRouter>
          <NotificationAdmin />
        </PrivateRouter>

      ) 
    },
    {
      path:"/dashboard/addservice",
      element: (
      <PrivateRouter>
      <AddService />
      </PrivateRouter>
      )
    },
    {
      path:"/dashboard/notification/adoptionnotification",
      element:(
        <PrivateRouter>
          <AdoptionNotification />
        </PrivateRouter>

      ) 
    },
    {
      path:"/dashboard/notification/groomingnotification",
      element:(
        <PrivateRouter>
           <GroomingNotification />
        </PrivateRouter>
      )
    },
    {
      path:"/dashboard/notification/trainingnotification",
      element:(
        <PrivateRouter>
           <TrainingNotification />
        </PrivateRouter>
      )
    },
    {
      path:"/dashboard/notification/hostelnotification",
      element:(
        <PrivateRouter>
           <HostelNotification />
        </PrivateRouter>
      )
    },
    {
      path:"/dashboard/notification/groomingratingnotification",
      element:(
        <PrivateRouter>
           <GroomingRatingNotification />
        </PrivateRouter>
      )
    },
    {
      path:"/dashboard/notification/hostelratingnotification",
      element:(
        <PrivateRouter>
           <HostelRatingNotification />
        </PrivateRouter>
      )
    },
    {
      path:"/dashboard/notification/trainingratingnotification",
      element:(
        <PrivateRouter>
           <TrainingRatingNotification />
        </PrivateRouter>
      )
    },
    {
      path:"/dashboard/addpet",
      element:(
        <PrivateRouter>
          <AddPet />
        </PrivateRouter>
      ) 
    },
    {
      path:"/dashboard/addhostel",
      element:(
        <PrivateRouter>
          <Addhostel />
        </PrivateRouter>

      ) 
    },
    {
      path:"/dashboard/addgrooming",
      element:(
        <PrivateRouter>
          <Addgrooming />
        </PrivateRouter>
      ) 
    },
    {
      path:"/dashboard/addtraining",
      element:(
        <PrivateRouter>
          <AddTraining />
        </PrivateRouter>
      ) 
    },
    {
      path:"/lostfound/lost",
      element: <LostPet />
    },
    {
      path:"/lostfound/found",
      element: <FoundPet />
    }
  ]);

  return (
    // <AuthProvider>
      <RouterProvider router={router} />
    // </AuthProvider>
  );
}

export default AppRouter;
