import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const NavBar = () => {
    const { authUser } = useContext(UserContext);
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
               <Link className = 'signedin' to= '/users/signout'>Sign Out</Link>
             </>
            }
        </nav>
    );
}

export default NavBar;