# 401(k) Contribution Manager

A web application for managing 401(k) retirement contributions with real-time impact projections.

## Features

- **Flexible Contribution Options**: Choose between percentage of salary or fixed dollar amount per paycheck
- **Real-time Calculations**: See immediate impact on per-paycheck and annual contributions
- **Retirement Projections**: View projected balance at retirement age 65
- **YTD Tracking**: Monitor year-to-date contributions and employer match
- **Persistent Storage**: Backend API with SQLite database

## Tech Stack

**Frontend:**
- React 18
- Vite (fast dev server)
- Vanilla CSS

**Backend:**
- Node.js
- Express
- JSON file storage

## Prerequisites

- Node.js 18+ installed
- npm or yarn

## Quick Start

**Easy Mode (Recommended for testing):**

```bash
./start.sh
```

This automatically starts both servers. Press Ctrl+C to stop both.

---

**Manual Mode (Two terminal windows):**

### Terminal 1 - Backend

```bash
cd backend
npm install
npm start
```

**Wait for:** `Backend running on http://localhost:3001`

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

**Then open:** `http://localhost:3000`

---

**Having issues?** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or run `./test-backend.sh`

## Mock Data

The application uses realistic mock data:
- **Annual Salary**: $85,000
- **Age**: 32 years old
- **Current 401(k) Balance**: $28,450
- **YTD Contributions**: $6,200
- **YTD Employer Match**: $2,480
- **Default Contribution**: 8% of salary

## API Endpoints

### GET /api/user
Returns user profile and YTD data

### GET /api/contribution
Returns current contribution settings

### POST /api/contribution
Updates contribution settings
```json
{
  "contribution_type": "percentage|fixed",
  "contribution_value": number
}
```

## Architecture Decisions

**Why JSON file storage?**
- Zero dependencies, zero compilation
- Instant setup on any platform
- Human-readable data format
- Easy to inspect and debug
- Sufficient for demo/prototype

**Why Vite?**
- Instant hot module replacement
- Faster builds than Create React App
- Modern tooling

**Why vanilla CSS?**
- No build-time dependencies
- Full control over styling
- Demonstrates CSS proficiency
- Easy to extend or replace

## Retirement Calculation Logic

The retirement projection uses:
- 7% average annual return (historical S&P 500 average)
- Employer match capped at 4% of salary
- Biweekly payroll (26 pay periods)
- Compound growth calculation
- Current balance as starting point

## Future Enhancements

See video presentation for detailed roadmap.

## Project Structure

```
401k-app/
├── backend/
│   ├── server.js          # Express API server
│   ├── package.json
│   └── data.json         # JSON storage (auto-generated)
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main React component
    │   ├── main.jsx      # React entry point
    │   └── index.css     # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Development Notes

- Backend auto-seeds database on first run
- Frontend uses React hooks for state management
- All calculations happen client-side for real-time feedback
- Backend stores user preferences
