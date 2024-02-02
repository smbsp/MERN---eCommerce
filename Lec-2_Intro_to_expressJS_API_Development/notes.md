# nodemon

   -> it's a helpful tool for watching the chnages made in the nodeJS server.
   -> you need not to re-start the server, it automatically restart and watch the chnages made by the developer.
   -> how to install nodemon: npm i -D nodemon/ npm i --save-dev nodemon / yarn add -D nodemon

# package.json 

   -> used for dependency management - either install packages for dev dependencies or as a dependencies.
   -> script management - can serve the script files via node inside the package.json
   -> configuration options
   -> version management: semantic versioning 1.0.0 (major.minor.patch)
   -> to create package.json file : npm init -y / yarn init -y

# What is expressJS and why do we need it?

   - It just a wrapper of http module of nodeJS -> syntactical sugar of http module.
   - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
   - can you use just expressJS without nodeJS?
      Ans: No
   - ExpressJS is written on the top of NodeJS.

# API development

   - Web API/API/end points
      - API - Application Programming Interface.
      - It provides the data in certain format following the certain rules.
      - usecase - refer the notes on notepad
# expressJs installation
   1. nodeJS should install - https://nodejs.org/en
   2. ExpressJS - npm i --save express / npm i express / yarn add  express
   3. postman - https://www.postman.com/downloads/
       - its just a GUI to test the APIs/end points.

# CRUD/CURD Operations:

   1. CREATE: POST (HTTP methods)
        /api/user - to create a user {some data has send as payload}
   2. READ: GET
        /api/users - want to get all users data
   3. UPDATE/EDIT: PATCH/PUT
       /api/update/user - for update the user details
   4. DELETE: DELETE
       /api/delte/user - fir deleting a user