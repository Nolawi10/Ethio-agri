"""
WSGI entry point for PythonAnywhere deployment.
Point your PythonAnywhere web app to this file.
"""

import sys
import os

# Add the backend directory to the path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Import the Flask app
from app import app as application

# This is what PythonAnywhere will use
if __name__ == "__main__":
    application.run()

