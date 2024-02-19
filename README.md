# JWT-Node-API

feat: Implement user signup, login, and token generation endpoints

This commit adds functionality to handle user signup, login, and token generation using JSON Web Tokens (JWT). The code includes validation for email and password during signup, checks for existing users, and securely hashes passwords using bcrypt. Upon successful login, the endpoint returns a JWT token for authentication purposes. Additionally, a route is provided to fetch all users from the database.

Changes included:
- Implement signup endpoint with input validation and password hashing
- Implement login endpoint with user authentication and token generation
- Provide route to retrieve all users from the database


