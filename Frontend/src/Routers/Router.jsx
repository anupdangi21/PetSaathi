import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Main/App";
import Services from "../Main/Services" 
import Signin from "../Components/signin"
import Register from "../Components/register"
import About from "../Main/Aboutus"
import Marketplace from "../Main/market"
import Vregister from "../VendorRegistration/Vregister"
import Dashboard from "../admin/dashboard"
import Adoption from "../Services/Adoption"
import Hostel from "../Services/Hostel"
import Training from '../Services/PetTraining'

function AppRouter() {
 const router = createBrowserRouter([    
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/services",
                element: <Services />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path:"/signin",
                element: <Signin />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path:"/marketplace",
                element: <Marketplace />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/services/adoption",
                element: <Adoption />
            },
            {
                path:"/services/hostel",
                element: <Hostel />
            },
            {
                path:"/services/training",
                element: <Training />
            },
            {
                path: "/vendor/register",
                element: <Vregister />
            }
            
            ])


    return (
        <>

        <RouterProvider router={router} />
        </>
    );
}

export default AppRouter; // Ensure the export is correct