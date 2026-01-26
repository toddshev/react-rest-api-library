import { useContext, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../../context/UserContext';
import Error from './Error';

const UserSignIn = () => {
    const navigate = useNavigate();
    const { actions } = useContext(UserContext);
    const location = useLocation();
    const [errors, setErrors] = useState([]);
    const [from, setFrom] = useState('/');
    const emailAddress = useRef();
    const password = useRef();

    const handleSubmit = async (e)  => {
        e.preventDefault();
        if (location.state) {
            setFrom(location.state.from);
        }

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        try {
            const user = await actions.signIn(credentials);
            if (user){
                navigate(from);
            } else {
                setErrors(['Sign-in was unsuccessful']);
            }
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <>
        <div className="form--centered" >
                <h2>Sign In</h2>
                <Error errors= {errors} />
                <form onSubmit= {handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" ref = {emailAddress} type="email" />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" ref = {password} type="password" />
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/users/signup">Sign Up</Link>!</p>                
            </div>
            </>
    );
}

export default UserSignIn;