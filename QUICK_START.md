# 🚀 Quick Start Guide - LexiLearn with PostgreSQL

## What Changed?

Your LexiLearn project now uses **PostgreSQL** instead of SQLite! This provides:
- ✅ Better scalability
- ✅ Concurrent connections
- ✅ Advanced query capabilities
- ✅ Production-ready database

## Setup in 5 Minutes

### 1. Install PostgreSQL

**Windows:**
- Download: https://www.postgresql.org/download/windows/
- Run installer, remember your password!

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### 2. Create Database

```bash
# Windows (Command Prompt)
"C:\Program Files\PostgreSQL\15\bin\createdb" -U postgres lexilearn_db

# Mac/Linux
createdb -U postgres lexilearn_db
```

### 3. Install Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment

```bash
# Copy example file
copy .env.example .env     # Windows
cp .env.example .env       # Mac/Linux
```

Edit `.env` and set your PostgreSQL password:
```env
DB_PASSWORD=your_postgres_password_here
```

### 5. Initialize Database

```bash
npm run init-db
```

You should see:
```
✅ PostgreSQL Database connected successfully
✅ Table "vocabulary" created or already exists
✅ Table "user_progress" created or already exists
✅ Inserted 18 vocabulary words
🎉 Database initialization completed successfully!
```

### 6. Start Server

```bash
npm start
```

### 7. Start Frontend (New Terminal)

```bash
cd ../my-react-app
npm install
npm run dev
```

### 8. Open Browser

Visit: http://localhost:5173

## Verify Everything Works

### Test Database Connection
```bash
psql -U postgres -d lexilearn_db -c "SELECT COUNT(*) FROM vocabulary;"
```

Should show: `count: 18`

### Test API
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"ok","message":"LexiLearn API is running"}`

## Common Issues

### "password authentication failed"
- Edit `.env` file with correct PostgreSQL password
- Default user is `postgres`

### "database does not exist"
```bash
createdb -U postgres lexilearn_db
```

### "connection refused"
- Check if PostgreSQL is running:
  ```bash
  pg_isready
  ```
- Start PostgreSQL if needed

### "port 5432 already in use"
- Another PostgreSQL instance is running
- Or change port in `.env`: `DB_PORT=5433`

## What's Different from SQLite?

| Feature | SQLite (Old) | PostgreSQL (New) |
|---------|--------------|------------------|
| Database Type | File-based | Server-based |
| Connections | Single | Multiple concurrent |
| Scalability | Limited | Excellent |
| Production Ready | No | Yes |
| Setup | None needed | Install PostgreSQL |

## File Changes Made

### Modified Files:
- ✅ `server/package.json` - Added `pg` dependency
- ✅ `server/config/database.js` - PostgreSQL connection pool
- ✅ `server/routes/vocabulary.js` - Async PostgreSQL queries
- ✅ `server/scripts/initDatabase.js` - PostgreSQL schema
- ✅ `server/.env.example` - PostgreSQL configuration
- ✅ `README.md` - Updated documentation

### New Files:
- ✅ `POSTGRESQL_SETUP.md` - Detailed setup guide
- ✅ `QUICK_START.md` - This file!

### Removed Files:
- ❌ `python_database/` - All Python database files
- ❌ `DATABASE_INFO.md` - Old database info
- ❌ `PYTHON_DATABASE_GUIDE.md` - Python guide
- ❌ `server/lexilearn.db` - SQLite database file

## Next Steps

1. **Add More Words**: Use the API or database directly
2. **Customize**: Modify difficulty levels and categories
3. **Deploy**: PostgreSQL is production-ready!
4. **Backup**: Use `pg_dump` for regular backups

## Need Help?

- 📖 Full Guide: See `POSTGRESQL_SETUP.md`
- 🐛 Troubleshooting: Check PostgreSQL logs
- 💬 Issues: Review error messages in terminal

---

**You're all set! Start learning vocabulary! 📚✨**
