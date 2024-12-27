import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../App";
import Services from "../Services" 
import Signin from "../Components/signin"
import Register from "../Components/register"
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
                path: "/signin",
                element: <Signin />
            },
            {
                path: "/register",
                element: <Register />
            }
            ])


    return (
        <>

        <RouterProvider router={router} />
        </>
    );
}

export default AppRouter; // Ensure the export is correct