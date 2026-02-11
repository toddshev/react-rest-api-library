import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Root route
const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    //Fetch all courses, set state
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://react-rest-api-library-production.up.railway.app/api/courses');
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
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

    if (!courses) return <p>Loading...</p>
    //Display all courses, and an option for adding a new one
    return (
        <div className="wrap main--grid">
            {courses.map(course => (
                <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            ))}
            <Link className="course--module course--add--module" to="/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </Link>
        </div>
    )
}

export default Courses