import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';



const NavBar = () => {
    const { authUser, actions } = useContext(UserContext);
    const navigate = useNavigate();

    const handleUserSignOut = () => {
        actions.signOut();
        navigate('/');
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