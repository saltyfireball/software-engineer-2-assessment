#!/bin/bash

# Starts FastAPI backend and React frontend concurrently
# Run this script from the root of the project

# Set backend and frontend directories
BACKEND_DIR="api-server"
FRONTEND_DIR="frontend-server"

# Start FastAPI backend
echo "Starting FastAPI backend..."
cd "$BACKEND_DIR"
uvicorn main:app --reload --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!
cd ..

# Start React frontend
echo "Starting React frontend..."
cd "$FRONTEND_DIR"
npm start &
FRONTEND_PID=$!
cd ..

# Wait for processes to exit
echo "Dev servers running. Press Ctrl+C to stop."

# Trap Ctrl+C and kill both background processes
trap "kill $BACKEND_PID $FRONTEND_PID" INT
wait
