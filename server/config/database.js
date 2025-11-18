import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create database file in the project directory
const dbPath = join(__dirname, '..', 'lexilearn.db');
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Test the connection
export const testConnection = () => {
    try {
        const result = db.prepare('SELECT 1').get();
        console.log('✅ SQLite Database connected successfully');
        console.log(`📁 Database location: ${dbPath}`);
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
};

export default db;
