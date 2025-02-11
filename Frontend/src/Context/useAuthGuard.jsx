import { useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx"; // Adjust path based on your project structure
import Swal from "sweetalert2"

const useAuthGuard = () => {
    const { isAuthenticated } = useContext(AppContext);

    const withAuth = (callback) => {
        return () => {
            if (isAuthenticated) {
                callback();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "please login first to get access to the website!!!",
                    icon: "error"
                  });
            }
        };
    };

    return withAuth;
};

export default useAuthGuard;
