import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Error from './Error';
import api from '../../utils/apiHelper';


const CourseCreate = () => {
    const { authUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    //On form submit, pass creds and body to api helper to create new course
    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            emailAddress: authUser.emailAddress,
            password: authUser.password,        
        }

        const body = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id,
        }

        try {
            const response = await api('/courses', "POST", body, credentials);
            if (response.status === 201) {
                navigate('/')
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

    //Redirect to root route on cancel
    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <>
        <div className="wrap">
                <h2>Create Course</h2>
                <Error errors = {errors} />
                <form onSubmit= {handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref = {title} />
                            {authUser &&
                            <p>By {authUser.firstName} {authUser.lastName}</p>
                            }
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref = {description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref = {estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref = {materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className ="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default CourseCreate;