@echo off
setlocal

REM Set project paths
set BACKEND_DIR=api-server
set FRONTEND_DIR=frontend-server

REM Start FastAPI backend in a new window
echo Starting FastAPI backend...
start "FastAPI Backend" cmd /k "cd %BACKEND_DIR% && uvicorn main:app --reload --host 127.0.0.1 --port 8000"

REM Start React frontend in a new window
echo Starting React frontend...
start "React Frontend" cmd /k "cd %FRONTEND_DIR% && npm run dev"

echo.
echo Dev servers started in separate windows.
echo Press Ctrl+C in either window to stop them.