# DalanValan Logistics Corporation
## Overview
The **DalanValan** Logistics project is a full-stack application designed to manage logistics operations, including user management, vehicle tracking, and job assignments. The application features a React frontend, a FastAPI backend, and a SQLite3 database with SQLAlchemy as the ORM.

## Tech Stack
* **Frontend**: React
* **Backend**: FastAPI
* **Database**: SQLite3
* **ORM**: SQLAlchemy
* **Languages**: Python, JavaScript
* **Runtime**: Node.js

## Features
### Completed
* Backend CRUD Operations
    * Users: Create, read, update, and delete user records.
    * Vehicles: Manage vehicle data with full CRUD support.
    * Jobs: Handle job assignments with basic CRUD functionality.

### To Do:
* **User Authentication**: Implement secure user authentication for the backend.

## Requirements
To run the project, ensure the following are installed:
* Python (>= 3.8)
* Node.js (>= 14.x)
* SQLite3

## Setup Instructions
### 1. Clone the Repository:
    ```bash
    git clone https://github.com/sandeshpd/Logistics-Corporation.git
    cd logistics
    ```

### 2. Backend Setup:
* Navigate to the backend directory:
    ```bash
    cd backend
    ```

* Create a virtual environment and install dependencies:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

* Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

### 3. Frontend Setup:
* Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

* Install Node.js dependencies:
    ```bash
    npm install
    ```

* Start the React development server:
    ```bash
    npm start
    ```

### 4. Database Setup:
* Ensure SQLite3 is installed.
* The database will be automatically initialized by SQLAlchemy when the backend starts.

## Usage
* Access the frontend at http://localhost:3000 (default React port).
* Access the backend API at http://localhost:8000 (default FastAPI port).
* Use the API endpoints to perform CRUD operations on Users, Vehicles, and Jobs.

## Contributing
1. Fork the repository.
2. Create a feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m "Add your feature").
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.

## License
This project is licensed under the MIT License.