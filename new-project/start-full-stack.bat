@echo off
echo 🚀 Starting Full Stack Application...

cd /d "%~dp0"

echo 📁 Starting Backend...
cd ..\Demo_Back

start "Backend" cmd /k "uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo 🔧 Backend started

timeout /t 3 /nobreak >nul

echo 📁 Starting Frontend...
cd ..\new-project

start "Frontend" cmd /k "npm run dev"

echo �� Frontend started

echo.
echo 🎉 Full Stack Application Started Successfully!
echo.
echo 📊 Backend API: http://localhost:8000
echo 🎨 Frontend: http://localhost:3000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop...
pause >nul
