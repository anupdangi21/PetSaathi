import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../App";
import Services from "../Services" 
// import Signin from "./signin"

function AppRouter() {
 const router = createBrowserRouter([    
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/services",
                element: <Services />
            }
            ])


    return (
        <>

        <RouterProvider router={router} />
        </>
    );
}

export default AppRouter; // Ensure the export is correct