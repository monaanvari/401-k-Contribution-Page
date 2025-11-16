# QUICK START

## Extract the files
```bash
tar -xzf 401k-app.tar.gz
cd 401k-app
```

## Option 1: Easy Start (Single Command)

```bash
./start.sh
```

This starts both backend and frontend automatically. Press Ctrl+C to stop.

To stop later:
```bash
./stop.sh
```

## Option 2: Manual Start (Two Terminals)

**Terminal 1:**
```bash
cd backend
npm install
npm start
```
Wait until you see: `Backend running on http://localhost:3001`

**Terminal 2:**
```bash
cd frontend
npm install
npm run dev
```

**Open:** http://localhost:3000

---

## Verify Backend is Working

```bash
./test-backend.sh
```

**Not working?** Read TROUBLESHOOTING.md
