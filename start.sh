#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Starting 401(k) App..."
echo ""

# Check if dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "${YELLOW}Installing backend dependencies...${NC}"
    cd backend && npm install > /dev/null 2>&1
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "${YELLOW}Installing frontend dependencies...${NC}"
    cd frontend && npm install > /dev/null 2>&1
    cd ..
fi

echo "${GREEN}Starting backend on port 3001...${NC}"
cd backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Test if backend is running
if curl -s http://localhost:3001/api/user > /dev/null 2>&1; then
    echo "${GREEN}✅ Backend is running (PID: $BACKEND_PID)${NC}"
else
    echo "${RED}❌ Backend failed to start${NC}"
    echo "Check backend.log for errors"
    exit 1
fi

echo "${GREEN}Starting frontend on port 3000...${NC}"
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

sleep 2

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${GREEN}✅ App is running!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  🌐 Frontend: http://localhost:3000"
echo "  🔧 Backend:  http://localhost:3001"
echo ""
echo "  Backend PID:  $BACKEND_PID"
echo "  Frontend PID: $FRONTEND_PID"
echo ""
echo "To stop:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Or save this command:"
echo "  echo 'kill $BACKEND_PID $FRONTEND_PID' > stop.sh && chmod +x stop.sh"
echo ""
echo "Logs:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""

# Create stop script
echo "kill $BACKEND_PID $FRONTEND_PID" > stop.sh
chmod +x stop.sh

echo "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo 'Stopped servers'; exit" INT TERM

# Keep script running
wait
