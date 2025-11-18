# 📁 LexiLearn Database Guide - SQLite with 1000+ Words

## ✅ What You Have Now

Your project now has:
- **SQLite Database** - A single file (`lexilearn.db`) inside the `server/` folder
- **1000+ Vocabulary Words** - Comprehensive word list with definitions
- **Easy to Share** - Just copy the project folder to show your teachers!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create Database with 1000+ Words
```bash
npm run init-db
```

This will create `server/lexilearn.db` with **1000+ vocabulary words**!

### 3. Start the Server
```bash
npm start
```

### 4. Start Frontend (New Terminal)
```bash
cd ../my-react-app
npm install
npm run dev
```

## 📊 Database Details

### Location
```
server/lexilearn.db
```

This file contains ALL your data in a single, portable file!

### Word Count
- **Total**: 1000+ words
- **Advanced**: ~350 words
- **Intermediate**: ~360 words
- **Beginner**: ~290 words

### Categories
- General
- Academic
- Character
- Communication
- Skills
- Emotion
- Action
- Social
- Art
- Lifestyle
- Science
- Business
- Technology
- And more!

## 🎓 For Teachers/Presentation

### Showing the Database

**Option 1: Use DB Browser for SQLite** (Recommended)
1. Download: https://sqlitebrowser.org/
2. Open `server/lexilearn.db`
3. View tables: `vocabulary` and `user_progress`
4. Browse all 1000+ words in a nice table format

**Option 2: VS Code Extension**
1. Install "SQLite Viewer" extension in VS Code
2. Click on `lexilearn.db` file
3. View data in VS Code

**Option 3: Online Viewer**
1. Visit: https://inloop.github.io/sqlite-viewer/
2. Upload `lexilearn.db`
3. View data in browser

### Database Schema

#### vocabulary table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Auto-increment primary key |
| word | TEXT | Vocabulary word (unique) |
| definition | TEXT | Word definition |
| difficulty | TEXT | Beginner/Intermediate/Advanced |
| category | TEXT | Word category |
| created_at | DATETIME | When word was added |
| updated_at | DATETIME | Last update time |

#### user_progress table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Auto-increment primary key |
| word_id | INTEGER | Links to vocabulary.id |
| learned | BOOLEAN | If word is learned |
| times_practiced | INTEGER | Practice count |
| last_practiced | DATETIME | Last practice time |
| created_at | DATETIME | When record was created |

## 📦 Sharing Your Project

To share with teachers:

### Method 1: Zip the Folder
1. Right-click on `LexiLearn - Copy` folder
2. Send to → Compressed (zipped) folder
3. Share the zip file

The database file (`lexilearn.db`) is included!

### Method 2: USB Drive
1. Copy entire `LexiLearn - Copy` folder to USB
2. Give to teacher
3. They can run it on their computer!

### Method 3: GitHub
```bash
git init
git add .
git commit -m "LexiLearn vocabulary app with 1000+ words"
git push
```

## 🔍 Verify Database

### Check Word Count
```bash
cd server
node -e "const db = require('better-sqlite3')('lexilearn.db'); console.log('Total words:', db.prepare('SELECT COUNT(*) as count FROM vocabulary').get().count);"
```

### Sample Queries

**Get all Advanced words:**
```sql
SELECT word, definition FROM vocabulary WHERE difficulty = 'Advanced' LIMIT 10;
```

**Count by difficulty:**
```sql
SELECT difficulty, COUNT(*) as count FROM vocabulary GROUP BY difficulty;
```

**Count by category:**
```sql
SELECT category, COUNT(*) as count FROM vocabulary GROUP BY category ORDER BY count DESC;
```

## 🎯 Benefits of SQLite for Your Project

✅ **Single File** - Everything in one `.db` file  
✅ **No Installation** - No database server needed  
✅ **Portable** - Copy and share easily  
✅ **Fast** - Perfect for 1000+ words  
✅ **Easy to Demo** - Open with free tools  
✅ **Professional** - Real database, not just JSON  

## 📱 API Endpoints

All working with your SQLite database:

- `GET /api/vocabulary` - Get all 1000+ words
- `GET /api/vocabulary/difficulty/Advanced` - Get advanced words
- `GET /api/vocabulary/category/Academic` - Get academic words
- `POST /api/vocabulary/random` - Get random word
- `POST /api/vocabulary/multiple-choice` - Get quiz options

## 🛠️ Maintenance

### Backup Database
```bash
copy server\lexilearn.db server\lexilearn_backup.db
```

### Reset Database
```bash
del server\lexilearn.db
npm run init-db
```

### Add More Words
Use the API or edit `scripts/createDatabaseWith1000Words.js`

## 📊 Database Statistics

After running `npm run init-db`, you'll have:

- **1000+ vocabulary words**
- **Multiple difficulty levels**
- **Diverse categories**
- **Professional definitions**
- **Ready for quizzes**
- **Fully searchable**

## 💡 Tips for Presentation

1. **Show the database file** - Point to `server/lexilearn.db`
2. **Open in DB Browser** - Display the table with all words
3. **Run the app** - Demonstrate the quiz functionality
4. **Show API responses** - Use Postman or browser
5. **Explain portability** - Single file, easy to share

---

**Your database is ready to impress! 📚✨**
