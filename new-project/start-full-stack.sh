#!/bin/bash

echo "🚀 Starting Full Stack Application..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check if backend port is available
if ! check_port 8000; then
    echo "❌ Backend port 8000 is already in use. Please stop the existing process."
    exit 1
fi

# Check if frontend port is available
if ! check_port 3000; then
    echo "❌ Frontend port 3000 is already in use. Please stop the existing process."
    exit 1
fi

echo "📁 Starting Backend..."
cd ../Demo_Back

# Start backend in background
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "🔧 Backend started with PID: $BACKEND_PID"

# Wait a moment for backend to start
sleep 3

echo "📁 Starting Frontend..."
cd ../new-project

# Start frontend in background
npm run dev &
FRONTEND_PID=$!

echo "🎨 Frontend started with PID: $FRONTEND_PID"

echo ""
echo "🎉 Full Stack Application Started Successfully!"
echo ""
echo "📊 Backend API: http://localhost:8000"
echo "🎨 Frontend: http://localhost:3000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
```

```

