@echo off
echo Starting LexiLearn Application...
echo.

echo [1/2] Starting Backend Server...
start "LexiLearn Backend" cmd /k "cd server && npm start"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend...
start "LexiLearn Frontend" cmd /k "cd my-react-app && npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window (servers will keep running)...
pause >nul
