from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import sqlite3
import os

# Detect if running on PythonAnywhere
# PythonAnywhere sets USER env var and uses /home/username structure
IS_PYTHONANYWHERE = 'pythonanywhere' in os.environ.get('HOME', '').lower() or os.environ.get('PYTHONANYWHERE_DOMAIN') is not None
IS_PRODUCTION = os.environ.get('FLASK_ENV') == 'production' or IS_PYTHONANYWHERE

# Get the directory where this script is located
basedir = os.path.abspath(os.path.dirname(__file__))

# Get paths based on environment
if IS_PYTHONANYWHERE:
    # On PythonAnywhere, use the project directory structure
    # Assuming you upload the entire project to /home/username/ethio-agri-aid/
    parent_dir = os.path.dirname(basedir)
    static_folder = os.path.join(parent_dir, 'dist')
    # Database in writable directory (home directory is writable)
    DATABASE = os.path.join(os.path.expanduser('~'), 'ethioagri.db')
else:
    # Local development
    parent_dir = os.path.dirname(basedir)
    static_folder = os.path.join(parent_dir, 'dist')
    DATABASE = os.path.join(basedir, 'ethioagri.db')

app = Flask(__name__, static_folder=static_folder, static_url_path='')

# Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production-USE-ENV-VAR')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['DEBUG'] = False if IS_PRODUCTION else True

# CORS configuration - more restrictive in production
if IS_PRODUCTION:
    # In production, allow specific origins or your domain
    allowed_origins = os.environ.get('ALLOWED_ORIGINS', '*').split(',')
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})
else:
    # Development: allow all origins
    CORS(app, resources={r"/api/*": {"origins": "*"}})

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

def init_db():
    """Initialize the database with users table"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'EthioAgri backend is running'}), 200

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not all(k in data for k in ('name', 'email', 'password')):
            return jsonify({
                'success': False,
                'message': 'Missing required fields: name, email, password'
            }), 400
        
        name = data.get('name').strip()
        email = data.get('email').strip().lower()
        phone = data.get('phone', '').strip()
        password = data.get('password')
        
        # Basic validation
        if len(password) < 6:
            return jsonify({
                'success': False,
                'message': 'Password must be at least 6 characters long'
            }), 400
        
        if not '@' in email:
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        conn = get_db()
        c = conn.cursor()
        
        # Check if user already exists
        c.execute('SELECT id FROM users WHERE email = ?', (email,))
        existing_user = c.fetchone()
        
        if existing_user:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'An account with this email already exists'
            }), 409
        
        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        # Insert new user
        c.execute('''
            INSERT INTO users (name, email, phone, password)
            VALUES (?, ?, ?, ?)
        ''', (name, email, phone, hashed_password))
        
        user_id = c.lastrowid
        conn.commit()
        conn.close()
        
        # Create access token
        access_token = create_access_token(identity=str(user_id))
        
        return jsonify({
            'success': True,
            'message': 'Account created successfully',
            'user': {
                'id': user_id,
                'name': name,
                'email': email,
                'phone': phone
            },
            'token': access_token
        }), 201
        
    except Exception as e:
        # Don't expose detailed error messages in production
        error_message = 'An error occurred. Please try again.' if IS_PRODUCTION else f'Server error: {str(e)}'
        return jsonify({
            'success': False,
            'message': error_message
        }), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        if not data or not all(k in data for k in ('email', 'password')):
            return jsonify({
                'success': False,
                'message': 'Missing email or password'
            }), 400
        
        email = data.get('email').strip().lower()
        password = data.get('password')
        
        conn = get_db()
        c = conn.cursor()
        
        # Find user
        c.execute('SELECT * FROM users WHERE email = ?', (email,))
        user = c.fetchone()
        conn.close()
        
        if not user:
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401
        
        # Check password
        if not bcrypt.check_password_hash(user['password'], password):
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401
        
        # Create access token
        access_token = create_access_token(identity=str(user['id']))
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'phone': user['phone']
            },
            'token': access_token
        }), 200
        
    except Exception as e:
        # Don't expose detailed error messages in production
        error_message = 'An error occurred. Please try again.' if IS_PRODUCTION else f'Server error: {str(e)}'
        return jsonify({
            'success': False,
            'message': error_message
        }), 500

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current authenticated user"""
    try:
        user_id = int(get_jwt_identity())
        
        conn = get_db()
        c = conn.cursor()
        c.execute('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', (user_id,))
        user = c.fetchone()
        conn.close()
        
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'phone': user['phone'],
                'created_at': user['created_at']
            }
        }), 200
        
    except Exception as e:
        # Don't expose detailed error messages in production
        error_message = 'An error occurred. Please try again.' if IS_PRODUCTION else f'Server error: {str(e)}'
        return jsonify({
            'success': False,
            'message': error_message
        }), 500

@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout endpoint (client-side token removal)"""
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200

# Serve React App - must be after all API routes
# This catch-all route serves the React app for all non-API routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve the React app for all non-API routes"""
    # Don't serve React app for API routes
    if path.startswith('api/'):
        return jsonify({'error': 'Not found'}), 404
    
    # Check if it's a static file (JS, CSS, images, etc.)
    if path and os.path.exists(os.path.join(static_folder, path)):
        return send_from_directory(static_folder, path)
    
    # For all other routes, serve index.html (React Router will handle routing)
    return send_from_directory(static_folder, 'index.html')

if __name__ == '__main__':
    # Check if dist folder exists
    if not os.path.exists(static_folder):
        print(f"Warning: {static_folder} not found!")
        print("Please build the React app first: npm run build")
        print("Starting server anyway for API-only mode...")
    
    # Only run development server if not on PythonAnywhere
    if not IS_PYTHONANYWHERE:
        port = int(os.environ.get('PORT', 5000))
        app.run(debug=not IS_PRODUCTION, host='0.0.0.0', port=port)

