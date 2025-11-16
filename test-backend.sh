#!/bin/bash

echo "Testing backend connection..."
echo ""

# Check if backend is running
if curl -s http://localhost:3001/api/user > /dev/null 2>&1; then
    echo "✅ Backend is running!"
    echo ""
    echo "User data:"
    curl -s http://localhost:3001/api/user | python3 -m json.tool
    echo ""
    echo "Contribution data:"
    curl -s http://localhost:3001/api/contribution | python3 -m json.tool
else
    echo "❌ Backend is NOT running on port 3001"
    echo ""
    echo "Start it with:"
    echo "  cd backend && npm start"
    echo ""
    echo "Or check if another process is using port 3001:"
    echo "  lsof -ti:3001"
fi
