import { Routes, Route, Navigate } from 'react-router-dom';

//Load all components
import Header from './components/Header.jsx'
import Courses from './components/Courses.jsx';
import CourseDetails from './components/CourseDetails.jsx';
import CourseCreate from './components/CourseCreate.jsx';
import CourseUpdate from './components/CourseUpdate.jsx';
import UserSignUp from './components/UserSignUp.jsx';
import UserSignIn from './components/UserSignIn.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import NotFound from './components/NotFound.jsx';
import Forbidden from './components/Forbidden.jsx';
import UnhandledError from './components/UnhandledError.jsx';

//Set up routes - private for update and create
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path = "/" element = {<Courses />} />
        <Route path = "/courses/:id" element = {<CourseDetails />} />
        <Route element = {<PrivateRoute />} >
          <Route path = "/courses/:id/update" element = {<CourseUpdate />} />
          <Route path = "/courses/create" element = {<CourseCreate />} />
        </Route>
        <Route path = "/users/signup" element = {<UserSignUp />} />
        <Route path = "/users/signin" element = {<UserSignIn />} />
        <Route path = "/notfound" element = {<NotFound />} />
        <Route path = "forbidden" element = {<Forbidden />} />
        <Route path = "/error" element = {<UnhandledError />} />
        <Route path = "*" element = {<Navigate to = '/notfound' />} />
      </Routes>
    </>
  )
}

export default App
