#!/bin/bash

echo "🚀 Starting Full Stack Development Environment..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Port $1 is available"
        return 0
    else
        echo "❌ Port $1 is already in use"
        return 1
    fi
}

# Check if backend is running
echo "🔍 Checking backend status..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "⚠️  Backend is not running. Please start the backend first:"
    echo "   cd Demo_Back && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
    echo ""
    read -p "Press Enter to continue anyway, or Ctrl+C to stop..."
fi

# Check if frontend port is available
if ! check_port 3000; then
    echo "❌ Frontend port 3000 is already in use"
    exit 1
fi

# Start frontend
echo "🌐 Starting frontend on http://localhost:3000"
cd new-project
npm run dev
