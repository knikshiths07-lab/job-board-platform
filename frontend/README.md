# Job Board Platform

This project includes a Django backend with JWT authentication and a React frontend.

## Backend

- Django 6
- Django REST Framework
- PostgreSQL
- Simple JWT

## Frontend

- React 18
- React Router
- Axios
- Bootstrap 5

## Running Backend

1. Activate the backend virtual environment:
   ```powershell
   cd backend
   .\venv\Scripts\Activate.ps1
   ```
2. Run migrations:
   ```powershell
   python manage.py migrate
   ```
3. Start the Django server:
   ```powershell
   python manage.py runserver
   ```

## Running Frontend

1. Install frontend dependencies:
   ```powershell
   cd frontend
   npm install
   ```
2. Start the React app:
   ```powershell
   npm start
   ```
