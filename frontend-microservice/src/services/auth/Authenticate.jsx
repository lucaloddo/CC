import { Navigate, Outlet } from "react-router-dom";


const Authenticate = () => {
    const userToken = sessionStorage.getItem("token");
    return userToken ? <Outlet />: <Navigate to="/login"/>;
};

export default Authenticate;