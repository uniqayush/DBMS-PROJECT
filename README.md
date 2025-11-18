# 📚 LexiLearn - Vocabulary Learning App

A modern, interactive vocabulary learning application built with React and SQLite. Master new words through engaging multiple-choice quizzes and track your progress! Includes **1000+ vocabulary words** ready to use!

## ✨ Features

- **Multiple Difficulty Levels**: Choose from Beginner, Intermediate, Advanced, or All levels
- **Interactive Quizzes**: Learn through multiple-choice questions
- **Progress Tracking**: Monitor your score, streak, and mastered words
- **Revision Mode**: Review words you've already learned
- **SQLite Database**: Lightweight, portable database with 1000+ words
- **RESTful API**: Clean backend architecture with Express.js
- **Easy to Share**: Single database file, perfect for presentations
- **Modern UI**: Beautiful, responsive design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)

### Installation

1. **Clone the repository**
   ```bash
   cd "LexiLearn - Copy"
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   copy .env.example .env
   ```
   
3. **Initialize the database with 1000+ words**
   ```bash
   npm run init-db
   ```
   
   This creates `server/lexilearn.db` with over 1000 vocabulary words!

4. **Start the backend server**
   ```bash
   npm start
   ```

5. **Set up the frontend** (in a new terminal)
   ```bash
   cd ../my-react-app
   npm install
   copy .env.example .env
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 Database Guide

For detailed database information, viewing options, and sharing instructions, see [DATABASE_GUIDE.md](DATABASE_GUIDE.md)

## 🏗️ Project Structure

```
LexiLearn/
├── server/                      # Backend Express.js server
│   ├── config/
│   │   └── database.js         # SQLite connection configuration
│   ├── routes/
│   │   └── vocabulary.js       # API routes for vocabulary
│   ├── lexilearn.db            # SQLite database file (1000+ words)
│   ├── scripts/
│   │   └── initDatabase.js     # Database initialization script
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Main server file
│   └── package.json
│
└── my-react-app/               # Frontend React application
    ├── src/
    │   ├── services/
    │   │   └── api.js          # API service layer
    │   ├── App.jsx             # Main app component
    │   ├── LearningInterface.jsx  # Learning interface component
    │   ├── vocabularyDatabase.new.js  # API wrapper
    │   └── main.jsx
    ├── .env.example            # Environment variables template
    └── package.json
```

## 🔌 API Endpoints

### Vocabulary Routes
- `GET /api/vocabulary` - Get all vocabulary words
- `GET /api/vocabulary/difficulty/:difficulty` - Get words by difficulty
- `GET /api/vocabulary/category/:category` - Get words by category
- `POST /api/vocabulary/random` - Get a random word
- `POST /api/vocabulary/random/difficulty/:difficulty` - Get random word by difficulty
- `POST /api/vocabulary/multiple-choice` - Generate multiple choice options
- `GET /api/vocabulary/categories` - Get all categories
- `GET /api/vocabulary/difficulties` - Get all difficulties
- `POST /api/vocabulary` - Add a new word
- `PUT /api/vocabulary/:id` - Update a word
- `DELETE /api/vocabulary/:id` - Delete a word

### Health Check
- `GET /api/health` - Check API status

## 💾 Database Schema

### vocabulary table
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key (auto-increment) |
| word | VARCHAR(255) | The vocabulary word (unique) |
| definition | TEXT | Word definition |
| difficulty | VARCHAR(50) | 'Beginner', 'Intermediate', or 'Advanced' |
| category | VARCHAR(100) | Word category |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### user_progress table
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key (auto-increment) |
| word_id | INTEGER | Foreign key to vocabulary.id |
| learned | BOOLEAN | Whether word is learned |
| times_practiced | INTEGER | Number of practice attempts |
| last_practiced | TIMESTAMP | Last practice timestamp |
| created_at | TIMESTAMP | Creation timestamp |

## 🎯 Usage

1. **Select Difficulty**: Choose your preferred difficulty level or select "All" for mixed practice
2. **Answer Questions**: Read the word and select the correct definition
3. **Track Progress**: View your score, streak, and mastered words
4. **Review Mode**: Practice words you've already learned
5. **View Statistics**: Check your learning progress and accuracy

## 🛠️ Technologies Used

### Frontend
- React 19
- Vite
- CSS3 with modern animations

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)

### Development Tools
- ESLint
- Nodemon

## 📝 Adding New Words

### Via SQLite
```sql
INSERT INTO vocabulary (word, definition, difficulty, category) 
VALUES ('Serendipity', 'The occurrence of events by chance in a happy way', 'Advanced', 'General');
```

### View Database
- Download [DB Browser for SQLite](https://sqlitebrowser.org/)
- Open `server/lexilearn.db`
- Browse all 1000+ words!

### Via API
```bash
curl -X POST http://localhost:5000/api/vocabulary \
  -H "Content-Type: application/json" \
  -d '{"word":"Serendipity","definition":"The occurrence of events by chance in a happy way","difficulty":"Advanced","category":"General"}'
```

## 🐛 Troubleshooting

### Database Issues
- If database is missing, run: `npm run init-db`
- Database location: `server/lexilearn.db`
- To reset: Delete `lexilearn.db` and run `npm run init-db` again

### Port Conflicts
- Backend: Change `PORT` in `server/.env`
- Frontend: Vite will auto-select next available port

### API Not Responding
- Ensure backend server is running
- Check `VITE_API_URL` in `my-react-app/.env`
- Verify firewall settings

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new vocabulary words
- Improve the UI/UX
- Add new features
- Fix bugs
- Improve documentation

## 📄 License

This project is open source and available for educational purposes.

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- SQLite database integration
- React state management
- Modern UI/UX design
- Environment configuration
- Error handling and validation
- Portable database design

---

**Happy Learning! 📚✨**
"# DBMS-PROJECT" 
"# PROJECT-DBMS-" 
