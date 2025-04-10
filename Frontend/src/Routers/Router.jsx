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
import Dashboard from "../vendor/dashboard.jsx"
import Adoption from "../Services/Adoption";
import Hostel from "../Services/Hostel";
import Training from "../Services/PetTraining";
import Grooming from "../Services/Grooming"
import Lostfound from "../Services/lostfound";
import AdminAdoption from "../vendor/Adoption.jsx"
import AddPet from "../vendor/addPets.jsx"
import LostPet from "../Pages/Lost"
import FoundPet from "../Pages/Found"
import NotificationAdmin from "../vendor/notificationAdmin.jsx"
import HostelAdmin from "../vendor/Hostel.jsx"
import TrainingAdmin from "../vendor/Training.jsx"
import Tracking from "../Pages/Tracking"
import UpdateProfile from "../Pages/cProfile"
import AdoptionNotification from "../Notifications/adoptionNotification"
import GroomingNotification from "../Notifications/groomingNotification"
import TrainingNotification from "../Notifications/trainingNotification"
import HostelNotification from "../Notifications/hostelNotification"
import GroomingRatingNotification from "../Notifications/groomingRatingNotification"
import HostelRatingNotification from "../Notifications/hostelRatingNotification"
import TrainingRatingNotification from "../Notifications/trainingRatingNotification"
import AddService from "../vendor/addService.jsx"
import PetGroom from "../vendor/petGroom.jsx"
import Addhostel from "../vendor/addHostel.jsx"
import Addgrooming from "../vendor/addGrooming.jsx"
import AddTraining from "../vendor/addTraining.jsx"
import PaymentSuccess from "../Payment/Success.jsx"
import PaymentFailure from "../Payment/Failure.jsx"
import PaymentHostelSuccess from "../Payment/SuccessHostel.jsx"
import PaymentTrainingSuccess from "../Payment/SuccessTraining.jsx"
import TrainingInfo from "../Services/ServicesInfo/TrainingInfo.jsx"
import GroomingInfo from "../Services/ServicesInfo/GroomingInfo.jsx"
import HostelInfo from "../Services/ServicesInfo/HostelInfo.jsx"
import AdminDashboard from "../ADMIN/AdminDashboard.jsx";
import Allusers from "../ADMIN/Allusers.jsx"
import Allvendors from "../ADMIN/Allvendors.jsx"
import Vendorprofile from "../Pages/vendorProfile.jsx"
import AdditemsMarket from "../Marketplace/addItems.jsx"
import Recentitems from "../Marketplace/recentItems.jsx"
import Vendorearnings from "../vendor/earnings.jsx"

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Admin-AnUpDaNgI-2333319",
      element: <AdminDashboard />,
    },
    {
      path:"/Admin-All-User",
      element:<Allusers />
    },
    {
      path:"/Admin-All-Vendor",
      element:<Allvendors />
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
      path:"/marketplace/additems",
      element:<AdditemsMarket />,
    },
    {
      path:"/marketplace/recentitems",
      element:<Recentitems />,
    },
    {
      path: "/vendordashboard",
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
      path: "/payment/success/groom",
      element: <PaymentSuccess />,
    },
    {
      path: "/payment/failure",
      element: <PaymentFailure />,
    },
    {
      path: "/payment/success/hostel",
      element: <PaymentHostelSuccess />,
    },
    {
      path: "/payment/success/training",
      element: <PaymentTrainingSuccess />,
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
      path:"/dashboard/vendorprofile",
      element:(<PrivateRouter>
        <Vendorprofile />
      </PrivateRouter>) 
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
      path: "/dashboard/e9826342424674872642-A234782423e45G289hI423reffkajsgfjhGeTdDgGyshg/earnings",
      element: (
      <PrivateRouter>
      <Vendorearnings />
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
