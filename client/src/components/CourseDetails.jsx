import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const CourseDetails = () => {
    const [courseDetails, setCourseDetails] = useState();
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                const data = await response.json();
                setCourseDetails(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    if (!courseDetails) return <p>Loading...</p>;

  
    console.log(courseDetails);
    return (
        <>
        <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" href={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" href={`/courses/${id}/delete`}>Delete Course</Link>
                    <Link className="button button-secondary" href={"/"}>Return to List</Link>
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