# 🍿 PopcornBox Backend

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This is the backend API for **PopcornBox**, a movie discovery and favorites application. It integrates with the **TMDB API** for comprehensive movie data and uses **MongoDB** for user authentication, management, and storing favorite movies.

---

## ✨ Features

-   🔐 **JWT-based User Authentication**: Secure sign-up and login functionality.
-   👤 **User Management**: Simple and effective user registration and session management.
-   🎬 **Comprehensive Movie Data**: Fetches data from the TMDB API, including popular, top-rated, upcoming, genres, and detailed movie information.
-   ❤️ **Personalized Favorites**: Allows users to save, view, and manage their list of favorite movies.
-   🛡️ **Protected Routes**: Middleware to secure user-specific endpoints.
-   ⚡ **Consistent API Responses**: A standardized JSON wrapper for all success and error responses.
-   🗄️ **Persistent Storage**: Utilizes MongoDB with Mongoose for robust data storage.

---

## 🛠️ Tech Stack

| Category           | Technology                                        |
| ------------------ | ------------------------------------------------- |
| **Runtime** | **Node.js** |
| **Framework** | **Express** |
| **Database** | **MongoDB** (with Mongoose ODM)                   |
| **Authentication** | **JSON Web Tokens (JWT)** |
| **API Client** | **Axios** (for TMDB API requests)                 |
| **Environment** | **dotenv** |

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/)
-   A [MongoDB](https://www.mongodb.com/cloud/atlas/register) Atlas cluster or local instance.
-   A [TMDB API Key](https://www.themoviedb.org/signup).

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/yourusername/popcornbox-backend.git](https://github.com/yourusername/popcornbox-backend.git)
    cd popcornbox-backend
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env` file in the project's root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/popcornbox
    JWT_SECRET=your_super_secret_jwt_key
    TMDB_API_KEY=your_tmdb_api_key
    ```

4.  **Run the server**

    For development (with automatic restarts):
    ```sh
    npm run dev
    ```
    The server will be running at 👉 **http://localhost:5000**

---

## 📡 API Endpoints

### 🔑 Authentication

-   `POST /api/auth/register` — Register a new user.
-   `POST /api/auth/login` — Log in an existing user and receive a JWT.

### 🎬 Movie Data (from TMDB)

-   `GET /api/movies/popular?page=1` — Get a list of popular movies.
-   `GET /api/movies/top-rated?page=1` — Get a list of top-rated movies.
-   `GET /api/movies/upcoming?page=1` — Get a list of upcoming movies.
-   `GET /api/movies/genres` — Get a list of all available movie genres.
-   `GET /api/movies/search?query=Batman&page=1` — Search for movies by a query string.
-   `GET /api/movies/genre/:genreId?page=1` — Get movies belonging to a specific genre.
-   `GET /api/movies/:id` — Get detailed information for a specific movie.
-   `GET /api/movies/:id/credits` — Get the cast and crew for a specific movie.

### ❤️ User Favorites (Protected Route)

-   `POST /api/favorites/add` — Add a movie to the user's favorites list.
-   `GET /api/favorites` — Get all favorite movies for the logged-in user.
-   `DELETE /api/favorites/:movieId` — Remove a movie from the user's favorites list.

---

## 🧪 Testing with Postman

1.  **Register a new user** by sending a `POST` request to `/api/auth/register`.
2.  **Login** using the new credentials via a `POST` request to `/api/auth/login`.
3.  Copy the `token` from the login response.
4.  For all **protected routes** (like the `/api/favorites` endpoints), you must include an `Authorization` header with your request:
    -   **Key**: `Authorization`
    -   **Value**: `Bearer <your_token>`

---

## 📂 Project Structure

### This project follows a clear and modular structure to keep the codebase organized and easy to maintain. Here's a breakdown of the main directories and files:

controllers/: This is where the core business logic resides. These files handle incoming API requests, process them, and send back responses.

middleware/: Contains custom Express middleware for tasks like user authentication, request logging, and error handling.

models/: Defines the database schemas using Mongoose, which dictates the structure of the data stored in MongoDB.

routes/: Manages all API endpoints. Each file here maps a specific URL path to a controller function.

services/: Handles communication with external APIs (like TMDB). This keeps the logic for fetching and processing external data separate and reusable.

utils/: A collection of utility functions and helpers used throughout the application, such as standardized response wrappers or data formatting functions.

### Key Files
.env: Stores environment variables and sensitive information like API keys and database connection strings. This file is kept out of version control for security.

.gitignore: Specifies which files and directories should be ignored by Git, preventing them from being committed to the repository.

index.js: The main entry point of the application. This file sets up the server, connects to the database, and loads the routes.

package.json: Lists all project dependencies and provides scripts for common tasks like starting the server or running tests.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

---

## 📜 License

This project is licensed under the MIT License.

© 2025 PopcornBox
