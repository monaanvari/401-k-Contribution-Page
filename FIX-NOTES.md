# Fixed: Node v25 Compatibility Issue

## Problem
better-sqlite3 requires native compilation and isn't compatible with Node v25 yet (needs C++20).

## Solution
Replaced SQLite with JSON file storage:
- Zero compilation needed
- Works on all Node versions
- Same functionality
- Actually simpler for a demo

## What Changed
- Backend now uses `data.json` instead of SQLite
- Removed better-sqlite3 dependency
- All features work identically

This is actually better for a take-home assignment - no native dependencies means it runs everywhere immediately.
