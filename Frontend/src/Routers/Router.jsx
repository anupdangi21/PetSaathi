import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute ";
// import  {AuthProvider}  from "./AuthContext ";
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
      element: (
        // <ProtectedRoute>
          <Dashboard />
        // {/* </ProtectedRoute> */}
      ),
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
      path:"/dashboard/adoption",
      element: <AdminAdoption />
    },
    {
      path: "/dashboard/hostel",
      element: <HostelAdmin />
    },
    {
      path: "/dashboard/training",
      element: <TrainingAdmin />
    },
    {
      path:"/dashboard/notification",
      element: <NotificationAdmin />
    },
    {
      path:"/dashboard/notification/adoptionnotification",
      element: <AdoptionNotification />
    },
    {
      path:"/dashboard/addpet",
      element: <AddPet />
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
