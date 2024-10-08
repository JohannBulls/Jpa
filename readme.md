# Property Management Application

A **React + Spring Boot** application for managing properties. This system allows users to register, log in, add, edit, and delete properties, providing a full CRUD experience. The backend is built with Spring Boot, while the frontend is developed using React.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user login and registration.
- **Protected Routes**: Only authenticated users can access certain routes (e.g., property management).
- **CRUD Operations**: Users can create, read, update, and delete properties.
- **Password Encryption**: Passwords are securely stored using encryption.
- **Form Validation**: Real-time form validation to ensure data integrity.
- **Session Management**: User sessions are managed with session storage.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

### Frontend:
- React
- React Router DOM
- Axios
- Bootstrap
- Font Awesome

### Backend:
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL (or another relational database)
- JWT for authentication

### Tools:
- Maven
- Docker (Optional)
- Postman (for API testing)

## Installation

### Prerequisites
- **Java 17** or higher
- **Node.js** and **npm**
- **MySQL** or any other relational database
- **Maven**
- **Postman** (optional, for testing)

### Backend Setup

1. **Clone the backend repository**:
    ```bash
    git clone https://github.com/yourusername/property-management-backend.git
    cd property-management-backend
    ```

2. **Configure the database**:
    - Create a MySQL database:
      ```sql
      CREATE DATABASE propertydb;
      ```
    - Edit the `application.properties` file in the `src/main/resources` directory with your database credentials:
      ```properties
      spring.datasource.url=jdbc:mysql://localhost:3306/propertydb
      spring.datasource.username=root
      spring.datasource.password=yourpassword
      ```

3. **Run the backend application**:
    ```bash
    mvn spring-boot:run
    ```
    The server should now be running on `http://localhost:8080`.

### Frontend Setup

1. **Clone the frontend repository**:
    ```bash
    git clone https://github.com/yourusername/property-management-frontend.git
    cd property-management-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend**:
    ```bash
    npm start
    ```
    The React app should now be running on `http://localhost:3000`.

## Usage

1. **Register** a new user by navigating to `http://localhost:3000/register`.
2. **Log in** with your registered credentials.
3. Once logged in, you can:
   - View the list of properties.
   - Add a new property.
   - Edit or delete existing properties.
   - Log out from the application.

### API Endpoints

| Endpoint              | Method | Description                          |
| --------------------- | ------ | ------------------------------------ |
| `/auth/register`      | POST   | Register a new user                  |
| `/auth/login`         | POST   | Log in a user                        |
| `/properties`         | GET    | Get all properties                   |
| `/properties/{id}`    | GET    | Get a property by its ID             |
| `/properties`         | POST   | Add a new property                   |
| `/properties/{id}`    | PUT    | Update an existing property          |
| `/properties/{id}`    | DELETE | Delete a property                    |

## Project Structure

```bash
property-management/
├── backend/
│   ├── src/
│   │   └── main/
│   │       └── java/com/example/property/
│   │           ├── controller/        # REST controllers
│   │           ├── model/             # Entity classes
│   │           ├── repository/        # Spring Data JPA Repositories
│   │           ├── service/           # Business logic
│   │           └── security/          # Spring Security configuration
│   └── pom.xml                        # Maven build file
├── frontend/
│   ├── src/
│   │   ├── components/                # React components
│   │   ├── services/                  # Axios services for API calls
│   │   ├── App.js                     # Main React component
│   │   └── index.js                   # Entry point
│   └── package.json                   # npm build file
└── README.md
```

## Contributing

We welcome contributions! If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m "Add a new feature"`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.