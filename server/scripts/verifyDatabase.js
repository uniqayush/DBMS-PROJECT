import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'lexilearn.db');

const db = new Database(dbPath);

console.log('🔍 Verifying database...\n');

const count = db.prepare('SELECT COUNT(*) as count FROM vocabulary').get();
console.log(`✅ Total words: ${count.count}`);

const distribution = db.prepare(`
    SELECT difficulty, COUNT(*) as count 
    FROM vocabulary 
    GROUP BY difficulty 
    ORDER BY difficulty
`).all();

console.log('\n📊 Distribution by difficulty:');
distribution.forEach(row => {
    console.log(`   ${row.difficulty}: ${row.count} words`);
});

const categories = db.prepare(`
    SELECT category, COUNT(*) as count 
    FROM vocabulary 
    GROUP BY category 
    ORDER BY count DESC
    LIMIT 10
`).all();

console.log('\n📚 Top 10 categories:');
categories.forEach(row => {
    console.log(`   ${row.category}: ${row.count} words`);
});

const sample = db.prepare('SELECT * FROM vocabulary ORDER BY RANDOM() LIMIT 5').all();

console.log('\n🎲 Random sample words:');
sample.forEach(w => {
    const def = w.definition.length > 60 ? w.definition.substring(0, 60) + '...' : w.definition;
    console.log(`   • ${w.word} (${w.difficulty}) - ${def}`);
});

console.log(`\n📁 Database file: ${dbPath}`);
console.log('✅ Database is ready to use!\n');

db.close();
