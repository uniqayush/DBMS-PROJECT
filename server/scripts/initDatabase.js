import db from '../config/database.js';

const initialVocabulary = [
    // Advanced Words
    { word: 'Serendipity', definition: 'The occurrence and development of events by chance in a happy or beneficial way', difficulty: 'Advanced', category: 'General' },
    { word: 'Ephemeral', definition: 'Lasting for a very short time', difficulty: 'Advanced', category: 'General' },
    { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere', difficulty: 'Advanced', category: 'General' },
    { word: 'Meticulous', definition: 'Showing great attention to detail; very careful and precise', difficulty: 'Advanced', category: 'General' },
    { word: 'Perspicacious', definition: 'Having a ready insight into and understanding of things', difficulty: 'Advanced', category: 'General' },
    { word: 'Magnanimous', definition: 'Very generous or forgiving, especially toward a rival or someone less powerful', difficulty: 'Advanced', category: 'Character' },
    
    // Intermediate Words
    { word: 'Resilient', definition: 'Able to withstand or recover quickly from difficult conditions', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', difficulty: 'Intermediate', category: 'Communication' },
    { word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically in a way that is based on practical rather than idealistic considerations', difficulty: 'Intermediate', category: 'General' },
    { word: 'Tenacious', definition: 'Tending to keep a firm hold of something; clinging or adhering closely', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Versatile', definition: 'Able to adapt or be adapted to many different functions or activities', difficulty: 'Intermediate', category: 'Skills' },
    { word: 'Diligent', definition: 'Having or showing care and conscientiousness in one\'s work or duties', difficulty: 'Intermediate', category: 'Character' },
    
    // Beginner Words
    { word: 'Innovative', definition: 'Featuring new methods; advanced and original', difficulty: 'Beginner', category: 'Skills' },
    { word: 'Ambitious', definition: 'Having or showing a strong desire and determination to succeed', difficulty: 'Beginner', category: 'Character' },
    { word: 'Confident', definition: 'Feeling or showing certainty about something', difficulty: 'Beginner', category: 'Character' },
    { word: 'Creative', definition: 'Relating to or involving the imagination or original ideas', difficulty: 'Beginner', category: 'Skills' },
    { word: 'Enthusiastic', definition: 'Having or showing intense and eager enjoyment, interest, or approval', difficulty: 'Beginner', category: 'Character' },
    { word: 'Reliable', definition: 'Consistently good in quality or performance; able to be trusted', difficulty: 'Beginner', category: 'Character' }
];

async function initDatabase() {
    const client = await pool.connect();
    
    try {
        console.log('📦 Initializing PostgreSQL database...');

        // Start transaction
        await client.query('BEGIN');

        // Create vocabulary table
        await client.query(`
            CREATE TABLE IF NOT EXISTS vocabulary (
                id SERIAL PRIMARY KEY,
                word VARCHAR(255) NOT NULL UNIQUE,
                definition TEXT NOT NULL,
                difficulty VARCHAR(50) NOT NULL CHECK(difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
                category VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Table "vocabulary" created or already exists');

        // Create indexes
        await client.query(`CREATE INDEX IF NOT EXISTS idx_difficulty ON vocabulary(difficulty)`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_category ON vocabulary(category)`);

        // Create user_progress table (for tracking learned words)
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_progress (
                id SERIAL PRIMARY KEY,
                word_id INTEGER NOT NULL,
                learned BOOLEAN DEFAULT FALSE,
                times_practiced INTEGER DEFAULT 0,
                last_practiced TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (word_id) REFERENCES vocabulary(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Table "user_progress" created or already exists');

        // Create indexes for user_progress
        await client.query(`CREATE INDEX IF NOT EXISTS idx_learned ON user_progress(learned)`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_word_id ON user_progress(word_id)`);

        // Check if vocabulary table is empty
        const countResult = await client.query('SELECT COUNT(*) as count FROM vocabulary');
        const count = parseInt(countResult.rows[0].count);
        
        if (count === 0) {
            console.log('📝 Inserting initial vocabulary data...');
            
            for (const vocab of initialVocabulary) {
                await client.query(
                    'INSERT INTO vocabulary (word, definition, difficulty, category) VALUES ($1, $2, $3, $4)',
                    [vocab.word, vocab.definition, vocab.difficulty, vocab.category]
                );
            }
            
            console.log(`✅ Inserted ${initialVocabulary.length} vocabulary words`);
        } else {
            console.log(`ℹ️  Vocabulary table already contains ${count} words`);
        }

        // Commit transaction
        await client.query('COMMIT');

        console.log('\n🎉 Database initialization completed successfully!');
        console.log('\nYou can now start the server with: npm start');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error initializing database:', error.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

initDatabase();
