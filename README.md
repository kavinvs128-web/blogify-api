# Blogify API

## Overview

Blogify API is an Express.js backend for a blogging platform built with MongoDB and JWT authentication. It supports user registration, login, post creation, retrieval, update, and deletion with protected routes for authenticated users.

## Features

- User registration with email validation and password hashing
- JWT-based authentication
- Create, read, update, and delete blog posts
- Protected post routes with authorization checks
- MongoDB data storage using Mongoose
- Global error handling middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs` for password hashing
- `express-validator` for input validation
- `cors` and `cookie-parser`
- `nodemon` for development

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance available (local or Atlas)
- A `.env` file with the required variables

### Installation

1. Clone the repository

```bash
git clone https://github.com/kavinvs128-web/blogify-api.git
cd blogify-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root

```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the server

```bash
npm run dev
```

or

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: secret key used to sign JWT tokens
- `PORT`: optional server port (default: `3000`)

## API Endpoints

The API base path is `/api/v1`.

### Public Routes

- `GET /` - Welcome message

### Auth Routes

- `POST /api/v1/auth/register`
  - Request body:
    - `username` (string, required)
    - `email` (string, required, valid email)
    - `password` (string, required, minimum 6 characters)
  - Success response includes the created user ID, username, and email.

- `POST /api/v1/auth/login`
  - Request body:
    - `email` (string, required)
    - `password` (string, required)
  - Success response includes a JWT token valid for 1 hour.

- `GET /api/v1/auth/practice-token`
  - Returns a demo JWT token for practice and testing.

### Post Routes

Protected routes require a valid JWT token sent in one of these ways:

- Cookie named `token`
- `Authorization: Bearer <token>` header

- `GET /api/v1/posts`
  - Retrieves all posts with populated author information.

- `GET /api/v1/posts/:id`
  - Retrieves a single post by its ID.

- `POST /api/v1/posts`
  - Creates a new post.
  - Request body:
    - `title` (string, required)
    - `content` (string, optional)
  - The authenticated user is automatically set as the post author.

- `PUT /api/v1/posts/:id`
  - Updates an existing post by ID.
  - Only the post author may update the post.

- `DELETE /api/v1/posts/:id`
  - Deletes an existing post by ID.
  - Only the post author may delete the post.

### User Routes

- `GET /api/v1/users/:userId`
  - Returns user detail for the provided user ID.
  - Note: this route is currently implemented as a placeholder and may return sample or incomplete data.

## Data Models

### User

- `username`: String, required
- `email`: String, required, unique
- `password`: String, required
- `createdAt`, `updatedAt`

### Post

- `title`: String, required
- `content`: String
- `author`: ObjectId reference to `User`, required
- `createdAt`, `updatedAt`

## Middleware

- `auth.middleware.js` protects routes by validating JWT tokens from cookies or headers.
- `errorHandler.js` handles uncaught errors and returns a standardized JSON response.

## Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with `nodemon` for development

## Notes

- Ensure `JWT_SECRET` is kept secure.
- Use a valid MongoDB URI for `MONGO_URI`.
- Protected routes require authentication and authorization.

## License

ISC
