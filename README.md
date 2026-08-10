# Movie Journal

Movie Journal is a full-stack web application that allows users to discover, save and organise movies into a personal journal. Users can create a personalised collection of films, record ratings and journal entries, with planned support for personalised movie recommendations.

## Features

### Week 1

- Full CRUD functionality for movie entries
- RESTful API built with Hapi.js
- Prisma ORM with PostgreSQL database
- Deployed backend using Railway
- Unit testing with Jest

### Week 2

- User registration and login
- Password hashing using bcrypt
- JWT authentication
- Role-based access control (User and Admin)
- Ownership checks to ensure users can only modify their own movie entries
- Integration tests covering authentication and authorisation
- Postman collection included for API testing

## API Endpoints

### Public Routes

| Method | Endpoint       | Description                          |
| ------ | -------------- | ------------------------------------ |
| POST   | `/register`    | Register a new user                  |
| POST   | `/login`       | Authenticate a user and return a JWT |
| GET    | `/healthcheck` | Check API health                     |

### Protected Routes

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/movies`      | Create a new movie entry |
| GET    | `/movies`      | Retrieve movie entries   |
| GET    | `/movies/{id}` | Retrieve a movie by ID   |
| PATCH  | `/movies/{id}` | Update a movie entry     |
| DELETE | `/movies/{id}` | Delete a movie entry     |

Protected routes require a valid JWT to be sent as a Bearer token in the `Authorization` header.

## Authentication & Authorisation

This project uses **JSON Web Tokens (JWT)** for stateless authentication. I chose JWT rather than server-side sessions because the application uses a separate React frontend and Hapi backend. After login, the frontend can send the JWT with each protected API request in the Authorization header, allowing the backend to authenticate the user without maintaining server-side session state. This approach also fits the application's cross-origin client/API architecture, where the frontend and backend are deployed separately.

Passwords are securely hashed using bcrypt before being stored in the database.

Authorisation rules include:

- Users can only view, update and delete their own movie entries.
- Administrators have permission to manage all movie entries.
- Ownership checks are performed on every protected route.

## Testing

The project includes:

- Unit tests for the service layer using mocked Prisma methods.
- Integration tests using Hapi's `server.inject()`.
- Authentication tests.
- Authorisation tests proving:
  - Unauthenticated users receive `401 Unauthorized`.
  - Users cannot modify another user's movie entries.
  - Users cannot delete another user's movie entries.
  - Administrators can edit any movie entry.
  - Administrators can delete any movie entry.
  - Users only receive their own movie entries.
  - Administrators can retrieve all movie entries.

## Postman Collection

A Postman collection is included in the `postman/` directory.

Import the collection into Postman, register or log in to obtain a JWT, then use the returned token to test the protected endpoints.

## Tech Stack

### Backend

- Hapi.js
- Node.js
- Prisma ORM
- PostgreSQL

### Frontend

- React (coming soon)

### Testing

- Jest
- Postman

## Current Status

**Week 2 Complete**

### Completed

- ✅ RESTful CRUD API
- ✅ PostgreSQL database with Prisma ORM
- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Role-based authorisation
- ✅ Ownership checks
- ✅ Unit testing
- ✅ Integration testing
- ✅ Railway deployment

### Next Steps

- Frontend integration
- Movie recommendation engine
- Improved search and filtering
- User profile enhancements
