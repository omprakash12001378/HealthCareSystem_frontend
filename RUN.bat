@echo off
echo ========================================
echo Healthcare Management System - Frontend
echo ========================================
echo.
echo This will start the React development server
echo Make sure all backend services are running first!
echo.
echo Frontend will be available at: http://localhost:3000
echo API Gateway: http://localhost:8080
echo.
pause
echo.
echo Starting...
cd /d "%~dp0"
npm start

