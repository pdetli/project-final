# INFO

- Project by Daniel & Pinar

# E-Commerce site with:

- Header
- Main
- Footer
- Product screen
- Cart screen
- Categories
- Product images = 600x600
-

# TODO

- Backend (schemas, mongoDB, heroku, endpoints(post, delete, patch etc.))
- Search function
- Styling
- products/123 (123 = number with no matching id) will show on screen as loading and not found.
-

# DONE

- Main page template with mapped products - React/JSX & CSS
- Rating Stars
- Product screen
- Created Store ("shop" for product/products fetch)
- Cart screen
- Categories
-

# INSTALLS

- Create-react-app frontend
- /frontend npm install react-router-dom
- /root/ npm init
- /root/ npm install express
- package.json under "name" add "type":"module"
- npm install --save-dev nodemon
- in package.json added under "scripts": "start":"nodemon --watch backend --exec node --experimental-modules backend/server.js"
- frontend/package.json added "proxy":"http://localhost:3003"
- /root/ npm install cors
- /frontend/ npm install @reduxjs/toolkit
- /frontend/ npm install @mui/material @emotion/react @emotion/styled
-

# TO THINK ABOUT

- Error/success responses
-

# On Call Questions

- Heroku deployment, missing some installation or something maybe?
- Double click on our search function fetch
- Can't import data.json (only .js). "Unknown file extension ".json""
-

# Saved code snippets

- web: node --experimental-modules backend/server.js

# Links

- https://vinylshop-api.herokuapp.com/api/products/vinyl

# Backend / some progress

- get request for vinyl uploads

- npm install cloudinary dotenv multer multer-storage-cloudinary
- npm install express-list-endpoints
- .env created for cloudinary secrets

- user schema and model in server.js
- /signin and /signup endpoints for post request
- user.js in the reducer file
- userScreen route in app.js

- vinyl reducer to use in uploader screen
-
