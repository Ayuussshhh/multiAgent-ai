#!/bin/bash

echo "🧪 Testing Backend Connection..."

# Test health endpoint
echo "Testing health endpoint..."
curl -s http://localhost:8000/health | jq .

# Test agents endpoint
echo "Testing agents endpoint..."
curl -s http://localhost:8000/agents | jq .

echo "✅ Backend tests completed!"
