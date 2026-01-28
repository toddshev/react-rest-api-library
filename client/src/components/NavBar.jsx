import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

//nav bar for header - dynamically changes based on auth
const NavBar = () => {
    const { authUser, actions } = useContext(UserContext);
   
    const handleUserSignOut = () => {
        actions.signOut();
    }

    return (
        <nav>
            {!authUser ?
            <ul className="header--signedout">
              <li><Link className="header--signedin" to='/users/signup'>Sign Up</Link></li>
              <li><Link className='signedin' to='/users/signin'>Sign In</Link></li>
             </ul>
             : 
             <ul className="header--signedin">
               <li>Welcome {authUser.firstName} {authUser.lastName}!</li>
               <li><button onClick={handleUserSignOut}>Sign Out</button></li>
             </ul>
            }
        </nav>
    );
}

export default NavBar;