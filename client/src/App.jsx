import { Routes, Route } from 'react-router-dom';
//Failed to resolve import 'react-router-dom' from 'src/App.jsx'
//Does the file exist?

import Header from './components/Header.jsx'
import Courses from './components/Courses.jsx';
//import CourseDetails from './components/CourseDetails.jsx';
//import SignUp from './components/SignUp.jsx';
//import SignIn from './components/SignIn.jsx';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path = "/" element = {<Courses />} />
    </Routes>
    {/* <Courses /> */}
    </>
  )
}




export default App

{/* <Routes>
  <Route path = "/" element = {<Courses />} />
  <Route path = "/courses" element = {<h2>Courses List</h2>} />
  <Route path = "/courses/:id" element = {<CourseDetails />} />
  <Route path = "/users" element = {<h2>Users List</h2>} />
  <Route path = "/users/:id" element = {<h2>User Details</h2>} />
  <Route path = "/courses/:id" element = {<h2>Delete Course</h2>} />
</Routes> */}