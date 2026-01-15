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

    console.log(courseDetails);
    return (
        <>
        <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" href={`#`}>Update Course</Link>
                    <Link className="button" href={`#`}>Delete Course</Link>
                    <Link className="button button-secondary" href="#">Return to List</Link>
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
                           {/* This keeps breaking everything.  No matter what I do it blows up the page
                           I then have to go back and re-do everything that was working before */}
                            <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseDetails