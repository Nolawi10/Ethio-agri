# EthioAgri Backend API

Flask backend for EthioAgri application with user authentication.

## Setup

1. **Build the React frontend first** (required for serving the app):
   ```bash
   # From project root
   npm install
   npm run build
   ```

2. **Install Python dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set environment variable (optional, defaults to 'your-secret-key-change-in-production')**:
   ```bash
   export JWT_SECRET_KEY='your-secret-key-here'
   ```

4. **Run the server**:
   ```bash
   python app.py
   ```

The server will run on `http://localhost:5000` and serve both:
- The React frontend app
- The API endpoints at `/api/*`

## Development vs Production

### Development Mode (Recommended)
Run frontend and backend separately for hot-reloading:
- Frontend: `npm run dev` (runs on port 8080)
- Backend: `python backend/app.py` (runs on port 5000)

The frontend will connect to `http://localhost:5000/api` automatically.

### Production Mode
Build the frontend and serve everything from Flask:
- Build frontend: `npm run build`
- Run backend: `python backend/app.py`
- Access app at: `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Authentication

#### Sign Up
- **POST** `/api/auth/signup`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+251911234567",
  "password": "password123"
}
```
- Response: User object and JWT token

#### Login
- **POST** `/api/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Response: User object and JWT token

#### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`
- Response: Current user object

#### Logout
- **POST** `/api/auth/logout`
- Headers: `Authorization: Bearer <token>`
- Response: Success message

## Database

Uses SQLite database (`ethioagri.db`) with a `users` table. The database is automatically created on first run.

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- Change `JWT_SECRET_KEY` in production (use environment variable)
- Enable HTTPS in production (PythonAnywhere provides this automatically)
- Detailed error messages are hidden in production
- CORS can be configured for specific origins in production
- Debug mode is automatically disabled in production

## Deployment

For PythonAnywhere deployment, see:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Full deployment guide
- [DEPLOYMENT_QUICKSTART.md](DEPLOYMENT_QUICKSTART.md) - Quick reference
