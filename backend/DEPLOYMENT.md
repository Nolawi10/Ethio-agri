# Deployment Guide - PythonAnywhere

This guide will help you deploy the EthioAgri application to PythonAnywhere.

## Prerequisites

1. A PythonAnywhere account (free tier works, but paid is recommended for production)
2. Your code uploaded to PythonAnywhere (via git or file upload)

## Step 1: Prepare Your Code

1. **Build the React frontend locally** (on your computer):
   ```bash
   npm install
   npm run build
   ```
   This creates the `dist` folder with your built React app.

2. **Upload your entire project** to PythonAnywhere:
   - You can use git: `git clone <your-repo-url>` in a Bash console
   - Or upload via the Files tab in PythonAnywhere dashboard
   - Recommended location: `/home/yourusername/ethio-agri-aid/`

## Step 2: Set Up Virtual Environment

1. Open a **Bash console** in PythonAnywhere
2. Navigate to your project directory:
   ```bash
   cd ~/ethio-agri-aid
   ```
3. Create a virtual environment:
   ```bash
   python3.10 -m venv venv
   # or python3.9 -m venv venv (check PythonAnywhere's available versions)
   ```
4. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```
5. Install dependencies:
   ```bash
   cd backend
   pip install --user -r requirements.txt
   ```

## Step 3: Configure Environment Variables

1. Go to the **Web** tab in PythonAnywhere dashboard
2. Click on your web app (or create a new one)
3. Scroll down to the **Environment variables** section
4. Add these variables:
   - `JWT_SECRET_KEY`: A strong, random secret key (use a password generator)
   - `FLASK_ENV`: `production`
   - `ALLOWED_ORIGINS`: Your domain (e.g., `https://yourusername.pythonanywhere.com`) - optional, defaults to `*`

**Important**: Generate a strong JWT_SECRET_KEY! You can use:
```python
import secrets
print(secrets.token_urlsafe(32))
```

## Step 4: Configure the Web App

1. In the **Web** tab, set:
   - **Source code**: `/home/yourusername/ethio-agri-aid/backend`
   - **Working directory**: `/home/yourusername/ethio-agri-aid/backend`
   - **WSGI configuration file**: Click the link and edit it

2. **Edit the WSGI file** (replace everything with):
   ```python
   import sys
   import os

   # Add your project directory to the path
   project_home = '/home/yourusername/ethio-agri-aid/backend'
   if project_home not in sys.path:
       sys.path.insert(0, project_home)

   # Import the Flask app
   from wsgi import application
   ```
   (Replace `yourusername` with your actual PythonAnywhere username)

3. **Save the WSGI file**

## Step 5: Static Files Configuration (Optional but Recommended)

For better performance, you can configure PythonAnywhere to serve static files directly:

1. In the **Web** tab, scroll to **Static files**
2. Add a mapping:
   - **URL**: `/static/`
   - **Directory**: `/home/yourusername/ethio-agri-aid/dist/`

However, the current setup serves static files through Flask, so this is optional.

## Step 6: Database Setup

The database will be automatically created in your home directory:
- Location: `/home/yourusername/ethioagri.db`
- It will be created on first request if it doesn't exist

## Step 7: Reload the Web App

1. Click the green **Reload** button in the Web tab
2. Your app should now be live at: `https://yourusername.pythonanywhere.com`

## Step 8: Test Your Deployment

1. Visit your domain: `https://yourusername.pythonanywhere.com`
2. Check the health endpoint: `https://yourusername.pythonanywhere.com/api/health`
3. Test signup/login functionality

## Troubleshooting

### Error: "ModuleNotFoundError"
- Make sure you installed all dependencies in the virtual environment
- Check that your WSGI file path is correct
- Verify the Python version matches (PythonAnywhere may use Python 3.9 or 3.10)

### Error: "Permission denied" for database
- The database is stored in your home directory, which should be writable
- Check file permissions: `ls -la ~/ethioagri.db`

### Static files not loading
- Ensure the `dist` folder was uploaded completely
- Check file paths in the WSGI configuration
- Check error logs in the Web tab

### CORS errors
- Add your domain to `ALLOWED_ORIGINS` environment variable
- Format: `https://yourusername.pythonanywhere.com` (no trailing slash)

### Viewing Error Logs
1. Go to **Web** tab
2. Click on **Error log** link
3. Check for Python errors and fix accordingly

## Security Checklist

- [ ] Set a strong `JWT_SECRET_KEY` environment variable
- [ ] Set `FLASK_ENV=production`
- [ ] Verify CORS settings are appropriate
- [ ] Ensure database file has proper permissions
- [ ] Use HTTPS (PythonAnywhere provides this automatically)

## Updating Your App

To update after making changes:

1. Pull/upload new code
2. Rebuild frontend if needed: `npm run build` (locally, then upload `dist` folder)
3. Restart web app: Click **Reload** in Web tab
4. Check error logs if issues occur

## Custom Domain (Paid Accounts)

If you have a paid account and want to use a custom domain:
1. Configure your domain in PythonAnywhere dashboard
2. Update `ALLOWED_ORIGINS` environment variable
3. Update frontend API URL if needed (though relative URLs should work)

