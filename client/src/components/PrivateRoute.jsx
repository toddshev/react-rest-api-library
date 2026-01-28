import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

//Used for /update and /create routes to ensure user is authorized or navigates to signin
const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);
    const location = useLocation();
    console.log(location);
    return authUser ? <Outlet /> : <Navigate to='/users/signin' state = {{from: location.pathname}} replace />
}

export default PrivateRoute;

