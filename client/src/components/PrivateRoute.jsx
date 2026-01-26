import { useContext } from 'react'
import { authUser } from '../../context/UserContext'
import { Outlet } from 'react-router-dom'


const PrivateRoute = () => {
    // if authUser render on Outlet
    // else redirect to signin screen
    
    //update createcourse and updatecourse to be wrapped inside privateroute
    return (
        <>
        </>
    )
}

export default PrivateRoute