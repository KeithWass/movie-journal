# DFD — Digital Film Dossier

**DFD (Digital Film Dossier)** is a full-stack web application for discovering, saving and organising films into a personal cinematic archive.

Users can search for films using data from **The Movie Database (TMDB)**, add films to their personal collection, record their own ratings and journal entries, and manage their collection through an authenticated account.

The project combines a **React frontend** with a **Hapi.js REST API**, PostgreSQL and Prisma, with JWT-based authentication and user ownership controls.

## Live Project

**Frontend:** [Add deployed frontend URL]

**Backend API:** https://movie-journal-o7uq.onrender.com

---

## Features

### Film Discovery

- Search for films using the TMDB API.
- Browse currently trending films.
- Display film posters, titles and release dates.
- Select a film from the search results to add to a personal collection.
- Store TMDB film identifiers alongside movie entries.

### Personal Film Collection

- Create personal film entries.
- Record:
  - Film title
  - Watched status
  - Personal rating
  - Journal entry
  - TMDB poster information
- View films belonging to the authenticated user.
- Receive a random recommendation from unwatched films in the personal collection.

### Authentication & Authorisation

- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based authorisation with User and Admin roles.
- Ownership checks ensure users can only access and modify their own film entries.
- Administrators can manage all film entries.

---

## Architecture

```text
React Frontend
      │
      │ HTTP / JSON
      ▼
Hapi.js REST API
      │
      ├── JWT Authentication
      ├── Authorisation
      ├── TMDB API
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL / Supabase
```

This project uses a separated frontend/backend architecture. The React application communicates with the Hapi API through HTTP requests, while the API handles authentication, authorisation, business logic and database access.

---

## API

### Public Routes

| Method | Endpoint       | Description                          |
| ------ | -------------- | ------------------------------------ |
| POST   | `/register`    | Register a new user                  |
| POST   | `/login`       | Authenticate a user and return a JWT |
| GET    | `/healthcheck` | Check API health                     |

### Protected Routes

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/movies`      | Create a movie entry   |
| GET    | `/movies`      | Retrieve movie entries |
| GET    | `/movies/{id}` | Retrieve a movie by ID |
| PATCH  | `/movies/{id}` | Update a movie entry   |
| DELETE | `/movies/{id}` | Delete a movie entry   |

Protected routes require a valid JWT supplied as a Bearer token in the `Authorization` header.

---

## Authentication & Authorisation

The application uses **JSON Web Tokens (JWT)** for stateless authentication.

I chose JWT because the application uses a separate React frontend and Hapi backend. After authentication, the frontend sends the JWT with protected API requests, allowing the backend to authenticate the user without maintaining server-side sessions.

Passwords are hashed using **bcrypt** before being stored in the database.

Authorisation is enforced at the API level:

- Users can only access their own movie entries.
- Users cannot modify or delete another user's entries.
- Administrators can manage all movie entries.
- Ownership checks are performed on protected movie routes.

---

## Testing

The backend includes both unit and integration testing using Jest.

### Unit Testing

Service-layer functionality is tested using mocked Prisma methods.

### Integration Testing

Hapi's `server.inject()` is used to test API behaviour without requiring a running HTTP server.

Tests cover:

- User registration
- Authentication
- Protected routes
- Unauthenticated requests
- Ownership checks
- User-specific movie retrieval
- Administrator access
- Updating movie entries
- Deleting movie entries

The authorisation tests verify that:

- Unauthenticated users receive `401 Unauthorized`.
- Users cannot modify another user's movie entries.
- Users cannot delete another user's movie entries.
- Users only receive their own movie entries.
- Administrators can manage movie entries across users.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Hapi.js
- JavaScript
- Prisma ORM
- PostgreSQL
- Supabase
- JWT
- bcrypt

### External APIs

- TMDB API

### Testing

- Jest
- Hapi `server.inject()`
- Postman

### Deployment

- Render
- Netlify
- Supabase

---

## Project Structure

```text
movie-journal/
├── frontend/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── App.css
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── lib/
│   └── start.js
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
├── postman/
└── README.md
```

---

## Current Status

### Completed

- ✅ RESTful CRUD API
- ✅ PostgreSQL database with Prisma ORM
- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Role-based authorisation
- ✅ Movie ownership checks
- ✅ User-specific movie retrieval
- ✅ CRUD operations
- ✅ Unit testing
- ✅ Integration testing
- ✅ React frontend
- ✅ TMDB film search
- ✅ Trending films
- ✅ Film selection and addition
- ✅ Watched/unwatched status
- ✅ Personal ratings and journal entries
- ✅ Movie poster storage
- ✅ Film-card interface
- ✅ Random unwatched film recommendation
- ✅ Backend deployment with Render

### Future Improvements

- Edit saved films from the dossier
- Improved filtering and sorting
- More personalised recommendations
- Additional TMDB metadata
- User profile functionality
- Further responsive/mobile improvements

---

## Development

The project is currently being prepared for public deployment as a portfolio project.