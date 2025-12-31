@echo off
echo Building React frontend...
call npm run build

if errorlevel 1 (
    echo Frontend build failed!
    pause
    exit /b 1
)

echo.
echo Starting Flask backend...
cd backend
python app.py

