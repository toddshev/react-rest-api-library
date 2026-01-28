import { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import UserContext from '../../context/UserContext';
import { api } from '../../utils/apiHelper';

const CourseDetails = () => {
    const [courseDetails, setCourseDetails] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const { authUser } = useContext(UserContext);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api(`/courses/${id}`, "GET");
                if (response.ok) {
                const data = await response.json();
                setCourseDetails(data);
                } else if (response.status === 404) {
                    navigate('/notfound');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log('Error fetching course:', error);
                navigate('/error');
            }
        };
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        const credentials = {
            emailAddress: authUser.emailAddress,
            password: authUser.password,
        }

        try {
            const response = await api(`/courses/${id}`, "DELETE", null,credentials);
            if (response.ok) {
                console.log(`Course ${courseDetails.title} has been deleted`);
                navigate('/');
            } else if (response.status === 404) {
                console.log(response.status);
                navigate('/notfound');
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }

    if (!courseDetails) return <p>Loading...</p>;

    if (authUser) {
        return (
            <>
            <div className="actions--bar">
                <div className="wrap">
                    {authUser.id === courseDetails.User.id &&
                    <>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className="button" to= '#' onClick={handleDelete}>Delete Course</Link>
                    </>
                    }
                    <Link className="button button-secondary" to={"/"}>Return to List</Link>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseDetails.title}</h4>
                            <p>By {courseDetails.User.firstName} {courseDetails.User.lastName}</p>
                            <ReactMarkdown>{courseDetails.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetails.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{courseDetails.materialsNeeded}</ReactMarkdown>                     
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
        )
    } else {
        return (
            <>
                <h2>No courses available to view</h2>
                <p>Click here to <Link to='/users/signin'>Sign In</Link>!</p>
            </>
        )
    }
}


export default CourseDetails