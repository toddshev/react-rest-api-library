import { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { api } from '../../utils/apiHelper';

const CourseDetails = () => {
    const [courseDetails, setCourseDetails] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const { authUser } = useContext(UserContext);
    console.log(id);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api(`/courses/${id}`, "GET");
                const data = await response.json();
                setCourseDetails(data);   
            } catch (error) {
                console.log('Error fetching course:', error);
            }
        };
        fetchCourses();
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
            } else {
                console.log(response.status);
                navigate('/error');
            }
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }

    if (!courseDetails) return <p>Loading...</p>;

  
    return (
        <>
        <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" to= '#' onClick={handleDelete}>Delete Course</Link>
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
                            <p>{courseDetails.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetails.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {courseDetails.materialsNeeded ? courseDetails.materialsNeeded.split('\n').map((item, index) => 
                                    <li key = {index}>{item.indexOf("*") === 0 ? item.slice(1, item.length) : item}</li> // slice to remove extra asterisk
                                ): null}                     
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseDetails