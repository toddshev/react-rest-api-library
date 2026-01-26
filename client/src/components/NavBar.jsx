import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';



const NavBar = () => {
    const { authUser, actions } = useContext(UserContext);
    const navigate = useNavigate();

    const handleUserSignOut = (e) => {
        e.preventDefault();
        actions.signOut();
        navigate('/');
    }

    return (
        <nav>
            {!authUser ?
            <>
              <Link className='signedin' to='/users/signup'>Sign Up</Link>
              <Link className='signedin' to='/users/signin'>Sign In</Link>
             </>
             : 
             <>
               <span>Welcome {authUser.firstName} {authUser.lastName}!</span>
               <button onClick = {handleUserSignOut}>Sign Out</button>
             </>
            }
        </nav>
    );
}

export default NavBar;