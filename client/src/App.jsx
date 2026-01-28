import { Routes, Route } from 'react-router-dom';
//Failed to resolve import 'react-router-dom' from 'src/App.jsx'
//Does the file exist?

import Header from './components/Header.jsx'
import Courses from './components/Courses.jsx';
import CourseDetails from './components/CourseDetails.jsx';
import CourseCreate from './components/CourseCreate.jsx';
import CourseUpdate from './components/CourseUpdate.jsx';
import CourseDelete from './components/CourseDelete.jsx';
import UserSignUp from './components/UserSignUp.jsx';
import UserSignIn from './components/UserSignIn.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import NotFound from './components/NotFound.jsx';
import Forbidden from './components/Forbidden.jsx';
import UnhandledError from './components/UnhandledError.jsx';


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
        <Route path = "/courses/:id/delete" element = {<CourseDelete />} />
        <Route path = "/users/signup" element = {<UserSignUp />} />
        <Route path = "/users/signin" element = {<UserSignIn />} />
        <Route path = "/notfound" element = {<NotFound />} />
        <Route path = "forbidden" element = {<Forbidden />} />
        <Route path = "/unhandlederror" element = {<UnhandledError />} />
        <Route path = "*" element = {<NotFound />} />
      </Routes>
    </>
  )
}

export default App
