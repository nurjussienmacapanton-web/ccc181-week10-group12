# CampusConnect API Specification

## 1. Overview

The CampusConnect API is a backend service developed using Node.js and Express.js. It handles user authentication and provides information about the currently logged-in user.

**Base URL:** `http://localhost:3000`

**API Version:** v1

## 2. Technologies Used

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs
- CORS
- dotenv

## 3. API Endpoints

### 3.1 Health Check

Checks whether the backend server is running.

- **Method:** GET
- **Endpoint:** `/api/v1/health`
- **Authentication:** Not required

**Successful Response – 200 OK**


# CampusConnect API Specification

Base URL: `http://localhost:3000/api/v1`

## 1. Health Check

**Endpoint:** `GET /health`

Checks whether the CampusConnect API is running.

**Success Response (200):**

```json
{
  "status": "ok"
}
```

### 3.2 User Login

Authenticates a user using their email and password. If the credentials are correct, the API generates a JWT token.

- **Method:** POST
- **Endpoint:** `/api/v1/sessions`
- **Authentication:** Not required
- **Content-Type:** `application/json`

**Request Body**
## 2. Login

**Endpoint:** `POST /sessions`

Authenticates a student using their email and password.

**Request Body:**

```json
{
  "email": "student@campusconnect.test",
  "password": "Campus26"
}
```

**Successful Response – 200 OK**

```json
{
  "token": "your_jwt_token",
**Success Response (200):**

```json
{
  "token": "your-jwt-token",
  "user": {
    "id": 1,
    "name": "Demo Student",
    "email": "student@campusconnect.test"
  }
}
```

**Error Response – 400 Bad Request**

Returned when the email or password is missing or the email format is invalid.

```json
{
  "error": "Email and password are required."
}
```

**Error Response – 401 Unauthorized**

Returned when the email or password is incorrect.

```json
{
  "error": "Invalid email or password."
}
```

### 3.3 Get Current User

Retrieves the information of the currently authenticated user.

- **Method:** GET
- **Endpoint:** `/api/v1/users/me`
- **Authentication:** Required

**Authorization Header**

```text
Authorization: Bearer your_jwt_token
```

**Successful Response – 200 OK**
**Error Responses:**

- `400 Bad Request` – Email and password are required.
- `401 Unauthorized` – Invalid email or password.

## 3. Get Current User

**Endpoint:** `GET /users/me`

Returns the profile of the currently authenticated student.

**Request Header:**

```http
Authorization: Bearer your-jwt-token
```

**Success Response (200):**

```json
{
  "id": 1,
  "name": "Demo Student",
  "email": "student@campusconnect.test"
}
```

**Error Response – 401 Unauthorized**

Returned when the token is missing, invalid, or expired.
**Error Response (401):**

```json
{
  "error": "Not logged in."
}
```

## 4. Authentication

CampusConnect uses JSON Web Tokens (JWT) for user authentication.

1. The user submits their email and password.
2. The server checks the credentials.
3. The password is verified using bcryptjs.
4. If the credentials are correct, the server generates a JWT.
5. The client sends the token in the Authorization header when accessing protected endpoints.

The JWT token expires after **1 hour**.

## 5. Demo Account

| Field | Value |
|---|---|
| Email | student@campusconnect.test |
| Password | Campus26 |
| Name | Demo Student |

## 6. Running the Backend

1. Open a terminal.
2. Navigate to the server folder.
3. Install dependencies:

```bash
npm install
```


4. Configure the environment variables in the `.env` file.
5. Start the backend:

```bash
npm start
```

The backend will run at:

`http://localhost:3000`

## 7. Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| PORT | Backend server port |
| JWT_SECRET | Secret key used to sign JWT tokens |
| CLIENT_ORIGIN | Allowed frontend origin |

**Note:** The `.env` file must not be uploaded to GitHub. Use `.env.example` as a reference.
## 4. Events API (Design Only)

The following endpoints are proposed for future development. They are not implemented in the current CampusConnect login activity.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/events` | Retrieve all events |
| GET | `/events/:id` | Retrieve a specific event |
| POST | `/events` | Add a new event |
| PATCH | `/events/:id` | Change part of an event's information |
| DELETE | `/events/:id` | Delete an event |
| GET | `/events?month=11` | Filter events by month |

**Note:** These Events API endpoints are design proposals only and are not part of the implemented backend.

