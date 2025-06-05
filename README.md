# Chapter Performance Dashboard API

## Overview

This is a RESTful API-based backend for a Chapter Performance Dashboard. It allows users to manage and retrieve chapter performance data with features like filtering, pagination, caching, and rate limiting.

---

## Features

1. **Endpoints**:

   - `GET /api/v1/chapters`: Fetch all chapters with optional filters and pagination.
   - `GET /api/v1/chapters/:id`: Fetch a specific chapter by its ID.
   - `POST /api/v1/chapters`: Upload chapters to the database (admin-only).

2. **Filtering**:

   - Filter chapters by `class`, `unit`, `status`, `weakChapters`, and `subject`.

3. **Pagination**:

   - Use `page` and `limit` query parameters to paginate results.

4. **Caching**:

   - Results of `GET /api/v1/chapters` are cached in Redis for 1 hour.
   - Cache is invalidated when new chapters are added.

5. **Rate Limiting**:
   - Limits requests to 30 requests/minute per IP address using Redis.

---

## Tech Stack

- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing chapter data.
- **Mongoose**: ODM for MongoDB.
- **Redis**: Used for caching and rate limiting.
- **Postman**: API testing and documentation.

---

## Installation

### Prerequisites

- Node.js installed on your system.
- MongoDB Atlas cluster or local MongoDB instance.
- Redis installed and running locally or on a server.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/whotfvasu/mathongo.git
   cd mathongo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```properties
   PORT=3000
   MONGO_URI=<your-mongodb-uri>
   REDIS_HOST=<your-redis-host>
   REDIS_PORT=<your-redis-port>
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

---

## API Documentation

### **GET /api/v1/chapters**

- **Description**: Fetch all chapters with optional filters and pagination.
- **Query Parameters**:
  - `class` (optional): Filter by class (e.g., `Class 11`).
  - `unit` (optional): Filter by unit (e.g., `Mechanics 1`).
  - `status` (optional): Filter by status (e.g., `Completed`).
  - `weakChapters` (optional): Filter by weak chapters (`true` or `false`).
  - `subject` (optional): Filter by subject (e.g., `Physics`).
  - `page` (optional): Page number for pagination (default: `1`).
  - `limit` (optional): Number of results per page (default: `10`).

---

### **GET /api/v1/chapters/:id**

- **Description**: Fetch a specific chapter by its ID.
- **Path Parameters**:
  - `id`: The ID of the chapter to fetch.

---

### **POST /api/v1/chapters**

- **Description**: Upload chapters to the database (admin-only).
- **Headers**:
  - `x-admin`: Set to `true` to simulate admin access.
- **Body** (JSON):
  ```json
  [
    {
      "subject": "Physics",
      "chapter": "Mathematics in Physics",
      "class": "Class 11",
      "unit": "Mechanics 1",
      "yearWiseQuestionCount": {
        "2019": 0,
        "2020": 2,
        "2021": 5,
        "2022": 5,
        "2023": 3,
        "2024": 7,
        "2025": 6
      },
      "questionSolved": 0,
      "status": "Not Started",
      "isWeakChapter": false
    }
  ]
  ```

---

## Deployment

The app is deployed on Render and can be accessed at:

**Live URL**: [https://chapter-performance-dashboard.onrender.com](https://chapter-performance-dashboard.onrender.com)

---

## Postman Collection

A Postman collection containing all routes is included in the repository as `postman_collection.json`.

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by [Vasu Parashar](https://github.com/whotfvasu).
