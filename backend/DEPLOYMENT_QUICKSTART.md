# PythonAnywhere Deployment - Quick Start

## 1. Build Frontend (Local)
```bash
npm install
npm run build
```

## 2. Upload to PythonAnywhere
- Upload entire project (including `dist` folder) to `/home/yourusername/ethio-agri-aid/`

## 3. Setup in PythonAnywhere

### In Bash Console:
```bash
cd ~/ethio-agri-aid/backend
python3.10 -m venv venv
source venv/bin/activate
pip install --user -r requirements.txt
```

### In Web Tab:
1. **Source code**: `/home/yourusername/ethio-agri-aid/backend`
2. **Working directory**: `/home/yourusername/ethio-agri-aid/backend`
3. **WSGI file**: Edit and use:
   ```python
   import sys
   import os
   project_home = '/home/yourusername/ethio-agri-aid/backend'
   if project_home not in sys.path:
       sys.path.insert(0, project_home)
   from wsgi import application
   ```

4. **Environment Variables** (add these):
   - `JWT_SECRET_KEY`: Generate with `python -c "import secrets; print(secrets.token_urlsafe(32))"`
   - `FLASK_ENV`: `production`

5. **Click Reload**

## 4. Test
Visit: `https://yourusername.pythonanywhere.com`

## Full Guide
See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

