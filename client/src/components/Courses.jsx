import Header from './Header.jsx';

async function getCourseList() {
    const response = await fetch('http://localhost:5000/api/courses');
    const data = await response.json();
    return data;
}
const courses = await getCourseList();

const courseArray = [];

for (let course of courses) {
    courseArray.push(
      <a className="course--module course--link" href={`/course/${course.id}`} key = {course.id}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </a>
    );
}

const Courses = () => {
    return (
        <>
        <Header />
        <div className="wrap main--grid">
            {courseArray}
            <a className="course--module course--add--module" href="create-course.html">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    </>
    )
}

export default Courses