# PostgreSQL Setup Guide for LexiLearn

## Prerequisites

1. **Install PostgreSQL**
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **Mac**: `brew install postgresql@15`
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib`

2. **Node.js** (v16 or higher)

## Step-by-Step Setup

### 1. Install PostgreSQL

After installing PostgreSQL, make sure the service is running:

**Windows:**
```cmd
# PostgreSQL should start automatically
# Check in Services or use:
pg_ctl status
```

**Mac/Linux:**
```bash
# Start PostgreSQL
brew services start postgresql@15  # Mac
sudo service postgresql start      # Linux

# Check status
pg_isready
```

### 2. Create Database

Open PostgreSQL command line (psql) or use pgAdmin:

**Using psql:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE lexilearn_db;

# Exit psql
\q
```

**Or using command line directly:**
```bash
createdb -U postgres lexilearn_db
```

### 3. Configure Environment Variables

1. Navigate to the server directory:
```bash
cd server
```

2. Copy the example environment file:
```bash
copy .env.example .env     # Windows
cp .env.example .env       # Mac/Linux
```

3. Edit `.env` file with your PostgreSQL credentials:
```env
PORT=5000

# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lexilearn_db
DB_USER=postgres
DB_PASSWORD=your_password_here

NODE_ENV=development
```

**Important:** Replace `your_password_here` with your actual PostgreSQL password.

### 4. Install Dependencies

```bash
npm install
```

This will install:
- `pg` - PostgreSQL client for Node.js
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variable management

### 5. Initialize Database

Run the initialization script to create tables and seed initial data:

```bash
npm run init-db
```

This will:
- Create `vocabulary` table
- Create `user_progress` table
- Create necessary indexes
- Insert 18 initial vocabulary words

### 6. Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Database Schema

### vocabulary table
```sql
CREATE TABLE vocabulary (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL UNIQUE,
    definition TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL CHECK(difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### user_progress table
```sql
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    word_id INTEGER NOT NULL,
    learned BOOLEAN DEFAULT FALSE,
    times_practiced INTEGER DEFAULT 0,
    last_practiced TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES vocabulary(id) ON DELETE CASCADE
);
```

## Verification

### Check Database Connection

```bash
psql -U postgres -d lexilearn_db -c "SELECT COUNT(*) FROM vocabulary;"
```

You should see 18 words initially.

### Test API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Get all vocabulary
curl http://localhost:5000/api/vocabulary

# Get words by difficulty
curl http://localhost:5000/api/vocabulary/difficulty/Beginner
```

## Common Issues & Solutions

### Issue: "password authentication failed"
**Solution:** 
- Verify your password in `.env` file
- Check PostgreSQL user permissions
- Reset password: `ALTER USER postgres PASSWORD 'new_password';`

### Issue: "database does not exist"
**Solution:**
```bash
createdb -U postgres lexilearn_db
```

### Issue: "connection refused"
**Solution:**
- Ensure PostgreSQL service is running
- Check if port 5432 is available
- Verify `DB_HOST` and `DB_PORT` in `.env`

### Issue: "role does not exist"
**Solution:**
```bash
# Create a new user
createuser -U postgres -P your_username
# Grant privileges
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE lexilearn_db TO your_username;"
```

## Database Management Tools

### pgAdmin
- Free GUI tool for PostgreSQL
- Download: https://www.pgadmin.org/

### DBeaver
- Universal database tool
- Download: https://dbeaver.io/

### VS Code Extensions
- **PostgreSQL** by Chris Kolkman
- **Database Client** by Weijan Chen

## Backup & Restore

### Backup
```bash
pg_dump -U postgres lexilearn_db > backup.sql
```

### Restore
```bash
psql -U postgres lexilearn_db < backup.sql
```

## Migration from SQLite

If you're migrating from SQLite:

1. Export data from SQLite
2. Run `npm run init-db` to create PostgreSQL tables
3. Import data using SQL scripts or API endpoints

## Production Considerations

1. **Use connection pooling** (already configured in `config/database.js`)
2. **Set strong passwords** for database users
3. **Enable SSL** for database connections
4. **Regular backups** using `pg_dump`
5. **Monitor connections** and query performance
6. **Use environment-specific configs** for dev/staging/prod

## Next Steps

1. Start the frontend React app (see main README.md)
2. Add more vocabulary words via API or database
3. Customize difficulty levels and categories
4. Implement user authentication (optional)

## Support

For issues or questions:
- Check PostgreSQL logs: `tail -f /var/log/postgresql/postgresql-15-main.log`
- Review server logs in terminal
- Verify `.env` configuration

---

**Happy Learning! 📚✨**
