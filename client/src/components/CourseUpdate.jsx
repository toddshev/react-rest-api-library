import { useEffect, useContext, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/apiHelper';
import UserContext from '../../context/UserContext';
import Error from './Error';
import Forbidden from '../components/Forbidden';

const CourseUpdate = () => {
    const [course, setCourse] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    console.log('course id: ' + id);


    //Fetch existing course data, set state
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api(`/courses/${id}`, "GET");
                if (response.ok) {
                    const data = await response.json();
                    setCourse(data);
                    console.log(data);
                }else if (response.status === 404) {
                    navigate('/notfound');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                navigate('/error');
            }
        };
        fetchCourses();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //On form submit, pass creds and body to api helper to update course
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
        }

        try {
            if (!authUser.id === course.User.id) {
                navigate('/forbidden');
            } else {
            const response = await api(`/courses/${id}`, "PUT", body, credentials);
            if (response.ok) {
                navigate(`/courses/${id}`);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
                console.log(data.errors);
            } else {
                throw new Error();
            }
        }
        } catch (error) {
            console.log(error);
            navigate('/notfound');
        }
    }

    //Redirect to root route on cancel
    const handleCancel = (e) =>{
        e.preventDefault();
        navigate('/');
    }

    //Don't render html until data is ready
    if (!course) return <p>Loading...</p>;

    //Render course form.  Only display if user id matches course
   // if (course.User.id === authUser.id ){
        return (
        <>
        {course.User.id ===authUser.id ?
            <div className="wrap">
                <h2>Update Course</h2>
                <Error errors = {errors} />
                <form onSubmit = {handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref= {title} defaultValue= {course.title} />

                            <p>By {course.User.firstname} {course.User.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref = {description} defaultValue= {course.description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref= {estimatedTime} defaultValue= {course.estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref = {materialsNeeded} defaultValue= {course.materialsNeeded}></textarea>
                        </div>
                    </div>
                  
                        <button className="button" type="submit">Update Course</button>
                  
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
            :
            <Forbidden />
        }
        </>
        )
};

export default CourseUpdate;