import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext.jsx";
import Swal from "sweetalert2";

const PrivateRouter = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, token, loading } = useContext(AppContext);

    useEffect(() => {
        if (!loading && (!isAuthenticated || !token)) {
            Swal.fire({
                icon: "warning",
                title: "Unauthorized!",
                text: "Please log in to access this page.",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/");
            });
        }
    }, [loading, isAuthenticated, token, navigate]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return isAuthenticated && token ? children : null;
};

export default PrivateRouter;