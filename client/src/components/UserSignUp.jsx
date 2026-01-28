import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Error from './Error';
import api from '../../utils/apiHelper';


const UserSignUp = () => {
    const navigate = useNavigate();
    const { actions } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    //Used in sign-up form
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        //Attempt to create a new user on form submit
        try {
            const response = await api('/users', "POST", user, null);
            if (response.status === 201) {
                console.log(`User ${user.firstName} ${user.lastName} has successfully been created!`);
                await actions.signIn(user);
                navigate('/');
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
                console.log(data.errors);
            } else {
                throw new Error();
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

    //Wait for data to return before rendering component
    if (!firstName) <p>Loading...</p>

    return (
        <>
        <div className="form--centered">
            <h2>Sign Up</h2>
            <Error errors= {errors} />
            <form onSubmit= {handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" ref = {firstName}type="text" />

                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" ref = {lastName} type="text" />

                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" ref = {emailAddress} type="email" />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" ref = {password} type="password" />

                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to='/users/signin'>Sign In</Link>!</p>
        </div>
        </>
    );
}

export default UserSignUp