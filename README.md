# Ethio Agri - የእፅዋት ጤንነት ምርመራ

## Project Overview

AI-powered plant health diagnosis for Ethiopian farmers. Detect nutrient deficiencies, diseases, and pests with localized recommendations.

## Project Structure

```
ethio-agri-aid/
├── src/                    # Frontend React application
├── backend/                # Flask backend API
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   └── README.md          # Backend documentation
└── ml_model/              # ML model (standalone)
    ├── plant_disease_model.py  # TensorFlow Lite model
    ├── requirements.txt   # ML dependencies
    └── README.md          # ML model documentation
```

## Development Setup

### Prerequisites
- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Python 3.8+ (for backend and ML model)

### Frontend Setup

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd ethio-agri-aid
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

The frontend will run on `http://localhost:8080`

### Backend Setup

**Important:** The Flask backend can serve the React app. You need to build the frontend first!

1. Build the React frontend:
   ```sh
   npm run build
   ```

2. Navigate to the backend directory:
   ```sh
   cd backend
   ```

3. Create a virtual environment (recommended):
   ```sh
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

5. (Optional) Set environment variables:
   ```sh
   # Windows (PowerShell):
   $env:JWT_SECRET_KEY="your-secret-key-here"
   
   # macOS/Linux:
   export JWT_SECRET_KEY="your-secret-key-here"
   ```

6. Run the backend server:
   ```sh
   python app.py
   # Or use the run script:
   python run.py
   ```

The backend will run on `http://localhost:5000` and serve:
- The React frontend app (from the `/dist` folder)
- The API endpoints at `/api/*`

**When you visit `http://localhost:5000`, you'll see the web app!**

For more details, see [backend/README.md](backend/README.md)

### ML Model Setup (Standalone)

The ML model is a separate component and is not integrated with the web application.

1. Navigate to the ml_model directory:
   ```sh
   cd ml_model
   ```

2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

3. Use the model:
   ```sh
   python plant_disease_model.py <path_to_image.jpg>
   ```

For more details, see [ml_model/README.md](ml_model/README.md)

## Technologies Used

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Backend
- Flask
- Flask-CORS
- Flask-Bcrypt (password hashing)
- Flask-JWT-Extended (authentication)
- SQLite (database)

### ML Model
- TensorFlow Lite
- NumPy
- Pillow (image processing)

## API Endpoints

The backend provides the following endpoints:

- `GET /api/health` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires authentication)
- `POST /api/auth/logout` - Logout (requires authentication)

See [backend/README.md](backend/README.md) for detailed API documentation.

## Deployment

The application is ready for deployment to PythonAnywhere. See:
- [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md) - Full deployment guide
- [backend/DEPLOYMENT_QUICKSTART.md](backend/DEPLOYMENT_QUICKSTART.md) - Quick start guide

### Key Security Features

- ✅ Production-ready configuration
- ✅ Secure password hashing (bcrypt)
- ✅ JWT authentication with configurable expiration
- ✅ Environment-based configuration
- ✅ CORS protection in production
- ✅ Error message sanitization in production
- ✅ Database stored in writable directory on PythonAnywhere
