# Course Library with React Front End and Express Back End

**Notes:** Vite was used for the build.  If run locally it requires two localhosts at port 5000 and 5173, respectively.  Install all node dependencies via npm install.
DB operations are carried out by Sequelize ORM and a Sqlite database.
Config is set to dev. Adjustments must be made for a production build.

## Express API
#### Endpoints
- GET users (retrieve all)
- POST users (create new)
- GET courses (retrieve all)
- GET courses/:id (retrieve single course)
- POST courses (create new)
- PUT courses/:id (update course)
- DELETE courses/:id (delete course)

## React Functionality
- Login/Authentication
- Authorization required for specific routes
- Standard CRUD operations
- Robust error handling

#### Routes
- / (root - courses)
- /courses/:id (details)
- /courses/:id/update (private - update)
- /courses/create (private - create)
- /users/signup (sign-up)
- /users/signin (sign in)

##### Error Routes
- /notfound
- /forbidden
- /error
- \* (not found)

