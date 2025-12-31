#!/bin/bash

echo "Building React frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "Frontend build failed!"
    exit 1
fi

echo ""
echo "Starting Flask backend..."
cd backend
python app.py

