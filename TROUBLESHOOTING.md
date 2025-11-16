# Troubleshooting: "Failed to load user data"

## Quick Fix

**Make sure the backend is running!**

```bash
# In the backend directory:
cd backend
npm install    # If you haven't already
npm start      # Keep this running!
```

You should see: `Backend running on http://localhost:3001`

**Then** in a separate terminal, start the frontend:
```bash
cd frontend
npm install    # If you haven't already
npm run dev
```

## Common Issues

### 1. Backend not running
**Symptom:** "Failed to load data. Is the backend running?"
**Fix:** Make sure you have TWO terminals open - one for backend, one for frontend

### 2. Port 3001 already in use
**Symptom:** `Error: listen EADDRINUSE: address already in use :::3001`
**Fix:** 
```bash
# Find what's using port 3001
lsof -ti:3001 | xargs kill -9

# Or change the port in backend/server.js (line 95)
const PORT = 3002;  // Or any available port

# Then update frontend/src/App.jsx (line 3)
const API_BASE = 'http://localhost:3002/api';
```

### 3. Dependencies not installed
**Symptom:** Cannot find module 'express' or 'cors'
**Fix:**
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. Wrong directory
**Symptom:** Can't find package.json
**Fix:** Make sure you're in the correct directory:
```bash
# Should be at: 401k-app/backend or 401k-app/frontend
pwd
ls package.json  # Should exist
```

## Verify Backend is Working

Test the API directly:
```bash
# Should return user data
curl http://localhost:3001/api/user

# Should return contribution settings
curl http://localhost:3001/api/contribution
```

## Still Not Working?

1. Check backend terminal for error messages
2. Check browser console (F12) for errors
3. Make sure Node.js version is 16+
4. Try restarting both servers
