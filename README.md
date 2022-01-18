# Logistic

- Help logistic company keep tracks of valuables
- Submission for Shopify backend internship challenge (Summer 2022)

---

# Running instruction

- I will assume that the reviewer has Node.js installed in his machine
- To run the backend server:

1. go to backend folder (cd backend)
2. instal dependencies (npm install)
3. start the server (npm run start)
4. (optional) open the sandbox explorer in http://localhost:5000/

- To run the frontend client:

1. go to frontend folder (cd frontend)
2. install dependencies (npm install)
3. start the app (npm start)
4. open the app in http://localhost:3000/

---

# Tech stack

- Backend: Apollo server, Mongoose, GraphQL, MongoDB Atlas for database, TypeScript
- Frontend: React, Apollo client

---

# Schema overview

- In database:

  - Product
    - id
    - name
    - category
    - manufacturer
    - location: refer to id of Location
  - Location
    - id
    - name
    - city

- In the API
  - getProducts: all Product data + Location data where the product is
  - createProduct
  - deleteProduct
  - updateProduct
  - getLocations
  - createLocation
