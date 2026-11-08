

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

**Error Response (401):**

```json
{
  "error": "Not logged in."
}
```

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

