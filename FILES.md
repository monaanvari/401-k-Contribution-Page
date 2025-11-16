# What's in the Package

## Quick Start Scripts
- **start.sh** - Start both servers with one command (EASIEST)
- **setup.sh** - Install all dependencies
- **test-backend.sh** - Test if backend is working
- **stop.sh** - Auto-generated when you run start.sh

## Documentation
- **README.md** - Full documentation
- **QUICKSTART.md** - Fastest way to get running
- **TROUBLESHOOTING.md** - Solutions to common problems
- **FEEDBACK.md** - Areas to provide feedback on
- **FIX-NOTES.md** - Why we use JSON instead of SQLite

## Application Code
```
backend/
├── server.js       # Express API server
├── package.json    # Backend dependencies
└── data.json       # Created automatically when you run it

frontend/
├── src/
│   ├── App.jsx     # Main React component
│   ├── main.jsx    # React entry point
│   └── index.css   # Styles
├── index.html
├── vite.config.js
└── package.json    # Frontend dependencies
```

## Typical Usage

1. Extract: `tar -xzf 401k-app.tar.gz && cd 401k-app`
2. Run: `./start.sh`
3. Open: http://localhost:3000
4. Stop: Press Ctrl+C or run `./stop.sh`
