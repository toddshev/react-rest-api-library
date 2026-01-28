import { Link } from 'react-router-dom';
import NavBar from './NavBar.jsx';

//Standard header for entire app.  Uses NavBar subcomponent.
const Header = () => {
    return (
        <>
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <link rel="stylesheet" href="/styles/reset.css" />
                <link rel="stylesheet" href="/styles/global.css" />
                <NavBar />
            </div>
        </header>
        </>
    );
};

export default Header