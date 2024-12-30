import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Main/App";
import Services from "../Services" 
import Signin from "../Components/signin"
import Register from "../Components/register"
import About from "../Main/Aboutus"
import Marketplace from "../Main/market"

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
            }
            ])


    return (
        <>

        <RouterProvider router={router} />
        </>
    );
}

export default AppRouter; // Ensure the export is correct