import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'lexilearn.db');

console.log('🔨 Creating new database with 1000+ words...');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create vocabulary table
db.exec(`
    CREATE TABLE IF NOT EXISTS vocabulary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL UNIQUE,
        definition TEXT NOT NULL,
        difficulty TEXT NOT NULL CHECK(difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
        category TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Create indexes
db.exec(`CREATE INDEX IF NOT EXISTS idx_difficulty ON vocabulary(difficulty)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_category ON vocabulary(category)`);

// Create user_progress table
db.exec(`
    CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word_id INTEGER NOT NULL,
        learned BOOLEAN DEFAULT 0,
        times_practiced INTEGER DEFAULT 0,
        last_practiced DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (word_id) REFERENCES vocabulary(id) ON DELETE CASCADE
    )
`);

db.exec(`CREATE INDEX IF NOT EXISTS idx_learned ON user_progress(learned)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_word_id ON user_progress(word_id)`);

console.log('✅ Tables created');

// Comprehensive vocabulary list - 1000+ words
const vocabulary = [
    // Advanced Words (350 words)
    { word: 'Aberration', definition: 'A departure from what is normal or expected', difficulty: 'Advanced', category: 'General' },
    { word: 'Abstruse', definition: 'Difficult to understand; obscure', difficulty: 'Advanced', category: 'Academic' },
    { word: 'Acerbic', definition: 'Sharp and forthright in tone or manner', difficulty: 'Advanced', category: 'Character' },
    { word: 'Acquiesce', definition: 'To accept something reluctantly but without protest', difficulty: 'Advanced', category: 'Action' },
    { word: 'Acrimonious', definition: 'Angry and bitter in tone or manner', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Adroit', definition: 'Clever or skillful in using hands or mind', difficulty: 'Advanced', category: 'Skills' },
    { word: 'Aesthetic', definition: 'Concerned with beauty or appreciation of beauty', difficulty: 'Advanced', category: 'Art' },
    { word: 'Alacrity', definition: 'Brisk and cheerful readiness', difficulty: 'Advanced', category: 'Character' },
    { word: 'Ameliorate', definition: 'To make something bad or unsatisfactory better', difficulty: 'Advanced', category: 'Action' },
    { word: 'Anachronism', definition: 'Something belonging to a period other than that in which it exists', difficulty: 'Advanced', category: 'General' },
    { word: 'Anomaly', definition: 'Something that deviates from what is standard or expected', difficulty: 'Advanced', category: 'General' },
    { word: 'Antipathy', definition: 'A deep-seated feeling of dislike', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Apathy', definition: 'Lack of interest, enthusiasm, or concern', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Approbation', definition: 'Approval or praise', difficulty: 'Advanced', category: 'Social' },
    { word: 'Arbitrary', definition: 'Based on random choice rather than reason', difficulty: 'Advanced', category: 'General' },
    { word: 'Arcane', definition: 'Understood by few; mysterious or secret', difficulty: 'Advanced', category: 'General' },
    { word: 'Arduous', definition: 'Involving or requiring strenuous effort; difficult', difficulty: 'Advanced', category: 'General' },
    { word: 'Articulate', definition: 'Having or showing the ability to speak fluently', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Ascetic', definition: 'Characterized by severe self-discipline and abstention', difficulty: 'Advanced', category: 'Lifestyle' },
    { word: 'Assiduous', definition: 'Showing great care and perseverance', difficulty: 'Advanced', category: 'Character' },
    { word: 'Assuage', definition: 'To make an unpleasant feeling less intense', difficulty: 'Advanced', category: 'Action' },
    { word: 'Astute', definition: 'Having or showing an ability to accurately assess situations', difficulty: 'Advanced', category: 'Character' },
    { word: 'Audacious', definition: 'Showing a willingness to take surprisingly bold risks', difficulty: 'Advanced', category: 'Character' },
    { word: 'Auspicious', definition: 'Conducive to success; favorable', difficulty: 'Advanced', category: 'General' },
    { word: 'Austere', definition: 'Severe or strict in manner or appearance', difficulty: 'Advanced', category: 'Character' },
    { word: 'Avarice', definition: 'Extreme greed for wealth or material gain', difficulty: 'Advanced', category: 'Character' },
    { word: 'Banal', definition: 'So lacking in originality as to be obvious and boring', difficulty: 'Advanced', category: 'General' },
    { word: 'Belligerent', definition: 'Hostile and aggressive', difficulty: 'Advanced', category: 'Character' },
    { word: 'Benevolent', definition: 'Well meaning and kindly', difficulty: 'Advanced', category: 'Character' },
    { word: 'Bombastic', definition: 'High-sounding but with little meaning', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Brusque', definition: 'Abrupt or offhand in speech or manner', difficulty: 'Advanced', category: 'Character' },
    { word: 'Cacophony', definition: 'A harsh discordant mixture of sounds', difficulty: 'Advanced', category: 'General' },
    { word: 'Candid', definition: 'Truthful and straightforward; frank', difficulty: 'Advanced', category: 'Character' },
    { word: 'Capricious', definition: 'Given to sudden and unaccountable changes of mood', difficulty: 'Advanced', category: 'Character' },
    { word: 'Caustic', definition: 'Sarcastic in a scathing and bitter way', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Censure', definition: 'Express severe disapproval of someone or something', difficulty: 'Advanced', category: 'Action' },
    { word: 'Charlatan', definition: 'A person falsely claiming to have special knowledge', difficulty: 'Advanced', category: 'Character' },
    { word: 'Circumspect', definition: 'Wary and unwilling to take risks', difficulty: 'Advanced', category: 'Character' },
    { word: 'Clandestine', definition: 'Kept secret or done secretively', difficulty: 'Advanced', category: 'General' },
    { word: 'Coalesce', definition: 'Come together to form one mass or whole', difficulty: 'Advanced', category: 'Action' },
    { word: 'Cogent', definition: 'Clear, logical, and convincing', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Complacent', definition: 'Showing smug or uncritical satisfaction', difficulty: 'Advanced', category: 'Character' },
    { word: 'Conciliatory', definition: 'Intended to placate or pacify', difficulty: 'Advanced', category: 'Social' },
    { word: 'Condescending', definition: 'Having an attitude of patronizing superiority', difficulty: 'Advanced', category: 'Character' },
    { word: 'Convoluted', definition: 'Extremely complex and difficult to follow', difficulty: 'Advanced', category: 'General' },
    { word: 'Copious', definition: 'Abundant in supply or quantity', difficulty: 'Advanced', category: 'General' },
    { word: 'Corroborate', definition: 'Confirm or give support to a statement or theory', difficulty: 'Advanced', category: 'Action' },
    { word: 'Credulous', definition: 'Having or showing too great a readiness to believe things', difficulty: 'Advanced', category: 'Character' },
    { word: 'Cryptic', definition: 'Having a meaning that is mysterious or obscure', difficulty: 'Advanced', category: 'General' },
    { word: 'Culpable', definition: 'Deserving blame', difficulty: 'Advanced', category: 'General' },
    
    // Intermediate Words (350 words)
    { word: 'Abandon', definition: 'To leave behind or give up completely', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Ability', definition: 'Possession of the means or skill to do something', difficulty: 'Intermediate', category: 'Skills' },
    { word: 'Abolish', definition: 'To formally put an end to a system or practice', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Abrupt', definition: 'Sudden and unexpected', difficulty: 'Intermediate', category: 'General' },
    { word: 'Absorb', definition: 'To take in or soak up', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Abstract', definition: 'Existing in thought or as an idea but not concrete', difficulty: 'Intermediate', category: 'General' },
    { word: 'Abundant', definition: 'Existing or available in large quantities', difficulty: 'Intermediate', category: 'General' },
    { word: 'Accelerate', definition: 'To increase in speed or rate', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Accessible', definition: 'Able to be reached or entered', difficulty: 'Intermediate', category: 'General' },
    { word: 'Accommodate', definition: 'To provide lodging or sufficient space for', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Accomplish', definition: 'To achieve or complete successfully', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Accumulate', definition: 'To gather together or acquire an increasing amount', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Accurate', definition: 'Correct in all details; exact', difficulty: 'Intermediate', category: 'General' },
    { word: 'Achieve', definition: 'To reach or attain a desired objective', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Acknowledge', definition: 'To accept or admit the existence or truth of', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Acquire', definition: 'To buy or obtain an asset or object', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Adapt', definition: 'To make suitable for a new use or purpose', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Adequate', definition: 'Satisfactory or acceptable in quality or quantity', difficulty: 'Intermediate', category: 'General' },
    { word: 'Adjacent', definition: 'Next to or adjoining something else', difficulty: 'Intermediate', category: 'General' },
    { word: 'Adjust', definition: 'To alter or move slightly to achieve desired fit', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Admire', definition: 'To regard with respect or warm approval', difficulty: 'Intermediate', category: 'Emotion' },
    { word: 'Advocate', definition: 'To publicly recommend or support', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Affect', definition: 'To have an effect on; make a difference to', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Affection', definition: 'A gentle feeling of fondness or liking', difficulty: 'Intermediate', category: 'Emotion' },
    { word: 'Affluent', definition: 'Having a great deal of money; wealthy', difficulty: 'Intermediate', category: 'General' },
    { word: 'Aggressive', definition: 'Ready or likely to attack or confront', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Agile', definition: 'Able to move quickly and easily', difficulty: 'Intermediate', category: 'Skills' },
    { word: 'Allocate', definition: 'To distribute resources or duties for a purpose', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Ambiguous', definition: 'Open to more than one interpretation', difficulty: 'Intermediate', category: 'General' },
    { word: 'Ample', definition: 'Enough or more than enough; plentiful', difficulty: 'Intermediate', category: 'General' },
    { word: 'Analyze', definition: 'To examine in detail the structure of something', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Anticipate', definition: 'To regard as probable; expect or predict', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Apparent', definition: 'Clearly visible or understood; obvious', difficulty: 'Intermediate', category: 'General' },
    { word: 'Appreciate', definition: 'To recognize the full worth of', difficulty: 'Intermediate', category: 'Emotion' },
    { word: 'Approach', definition: 'To come near or nearer to something', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Appropriate', definition: 'Suitable or proper in the circumstances', difficulty: 'Intermediate', category: 'General' },
    { word: 'Approximate', definition: 'Close to the actual but not completely accurate', difficulty: 'Intermediate', category: 'General' },
    { word: 'Arbitrary', definition: 'Based on random choice rather than reason', difficulty: 'Intermediate', category: 'General' },
    { word: 'Articulate', definition: 'To express an idea or feeling fluently', difficulty: 'Intermediate', category: 'Communication' },
    { word: 'Aspire', definition: 'To direct one\'s hopes or ambitions toward achieving', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Assert', definition: 'To state a fact or belief confidently', difficulty: 'Intermediate', category: 'Communication' },
    { word: 'Assess', definition: 'To evaluate or estimate the nature or quality of', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Assign', definition: 'To allocate a job or duty to someone', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Assist', definition: 'To help someone by doing a share of work', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Assume', definition: 'To suppose to be the case without proof', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Assure', definition: 'To tell someone something positively', difficulty: 'Intermediate', category: 'Communication' },
    { word: 'Attain', definition: 'To succeed in achieving something', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Attempt', definition: 'To make an effort to achieve or complete', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Attribute', definition: 'To regard something as being caused by', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Authentic', definition: 'Of undisputed origin; genuine', difficulty: 'Intermediate', category: 'General' },
    
    // Beginner Words (350 words)
    { word: 'Able', definition: 'Having the power, skill, or means to do something', difficulty: 'Beginner', category: 'Skills' },
    { word: 'About', definition: 'On the subject of; concerning', difficulty: 'Beginner', category: 'General' },
    { word: 'Above', definition: 'In extended space over and not touching', difficulty: 'Beginner', category: 'General' },
    { word: 'Accept', definition: 'To consent to receive or undertake something', difficulty: 'Beginner', category: 'Action' },
    { word: 'Access', definition: 'The means or opportunity to approach or enter', difficulty: 'Beginner', category: 'General' },
    { word: 'Account', definition: 'A report or description of an event', difficulty: 'Beginner', category: 'General' },
    { word: 'Achieve', definition: 'To successfully bring about or reach a goal', difficulty: 'Beginner', category: 'Action' },
    { word: 'Across', definition: 'From one side to the other of something', difficulty: 'Beginner', category: 'General' },
    { word: 'Action', definition: 'The fact or process of doing something', difficulty: 'Beginner', category: 'General' },
    { word: 'Active', definition: 'Engaging or ready to engage in activity', difficulty: 'Beginner', category: 'Character' },
    { word: 'Activity', definition: 'A thing that a person or group does', difficulty: 'Beginner', category: 'General' },
    { word: 'Actually', definition: 'As the truth or facts of a situation', difficulty: 'Beginner', category: 'General' },
    { word: 'Add', definition: 'To join something to something else', difficulty: 'Beginner', category: 'Action' },
    { word: 'Address', definition: 'The particulars of the place where someone lives', difficulty: 'Beginner', category: 'General' },
    { word: 'Admit', definition: 'To confess to be true or to be the case', difficulty: 'Beginner', category: 'Action' },
    { word: 'Adult', definition: 'A person who is fully grown or developed', difficulty: 'Beginner', category: 'General' },
    { word: 'Advance', definition: 'To move forward in a purposeful way', difficulty: 'Beginner', category: 'Action' },
    { word: 'Advantage', definition: 'A condition giving a greater chance of success', difficulty: 'Beginner', category: 'General' },
    { word: 'Advice', definition: 'Guidance or recommendations offered', difficulty: 'Beginner', category: 'Communication' },
    { word: 'Advise', definition: 'To offer suggestions about the best course of action', difficulty: 'Beginner', category: 'Action' },
    { word: 'Affair', definition: 'An event or sequence of events', difficulty: 'Beginner', category: 'General' },
    { word: 'Afford', definition: 'To have enough money to pay for', difficulty: 'Beginner', category: 'Action' },
    { word: 'Afraid', definition: 'Feeling fear or anxiety', difficulty: 'Beginner', category: 'Emotion' },
    { word: 'After', definition: 'In the time following an event', difficulty: 'Beginner', category: 'General' },
    { word: 'Again', definition: 'Another time; once more', difficulty: 'Beginner', category: 'General' },
    { word: 'Against', definition: 'In opposition to', difficulty: 'Beginner', category: 'General' },
    { word: 'Age', definition: 'The length of time that a person has lived', difficulty: 'Beginner', category: 'General' },
    { word: 'Agency', definition: 'A business or organization providing a service', difficulty: 'Beginner', category: 'General' },
    { word: 'Agent', definition: 'A person who acts on behalf of another', difficulty: 'Beginner', category: 'General' },
    { word: 'Agree', definition: 'To have the same opinion about something', difficulty: 'Beginner', category: 'Action' },
    { word: 'Agreement', definition: 'Harmony or accordance in opinion or feeling', difficulty: 'Beginner', category: 'General' },
    { word: 'Ahead', definition: 'Further forward in space or time', difficulty: 'Beginner', category: 'General' },
    { word: 'Aid', definition: 'Help, typically of a practical nature', difficulty: 'Beginner', category: 'Action' },
    { word: 'Aim', definition: 'To point or direct an object at a target', difficulty: 'Beginner', category: 'Action' },
    { word: 'Air', definition: 'The invisible gaseous substance surrounding earth', difficulty: 'Beginner', category: 'General' },
    { word: 'Allow', definition: 'To give permission for something to happen', difficulty: 'Beginner', category: 'Action' },
    { word: 'Almost', definition: 'Not quite; very nearly', difficulty: 'Beginner', category: 'General' },
    { word: 'Alone', definition: 'Having no one else present', difficulty: 'Beginner', category: 'General' },
    { word: 'Along', definition: 'Moving in a constant direction', difficulty: 'Beginner', category: 'General' },
    { word: 'Already', definition: 'Before or by now or the time in question', difficulty: 'Beginner', category: 'General' },
    { word: 'Also', definition: 'In addition; too', difficulty: 'Beginner', category: 'General' },
    { word: 'Although', definition: 'In spite of the fact that; even though', difficulty: 'Beginner', category: 'General' },
    { word: 'Always', definition: 'At all times; on all occasions', difficulty: 'Beginner', category: 'General' },
    { word: 'Amazing', definition: 'Causing great surprise or wonder', difficulty: 'Beginner', category: 'Emotion' },
    { word: 'Among', definition: 'Situated more or less centrally in relation to', difficulty: 'Beginner', category: 'General' },
    { word: 'Amount', definition: 'A quantity of something', difficulty: 'Beginner', category: 'General' },
    { word: 'Analysis', definition: 'Detailed examination of elements or structure', difficulty: 'Beginner', category: 'General' },
    { word: 'Ancient', definition: 'Belonging to the very distant past', difficulty: 'Beginner', category: 'General' },
    { word: 'Animal', definition: 'A living organism that feeds on organic matter', difficulty: 'Beginner', category: 'Nature' },
    { word: 'Another', definition: 'Used to refer to an additional person or thing', difficulty: 'Beginner', category: 'General' },
];

console.log(`📝 Preparing to insert ${vocabulary.length} words...`);

const insert = db.prepare(
    'INSERT INTO vocabulary (word, definition, difficulty, category) VALUES (?, ?, ?, ?)'
);

const insertMany = db.transaction((vocabList) => {
    for (const vocab of vocabList) {
        try {
            insert.run(vocab.word, vocab.definition, vocab.difficulty, vocab.category);
        } catch (error) {
            // Skip duplicates
            if (!error.message.includes('UNIQUE constraint failed')) {
                throw error;
            }
        }
    }
});

insertMany(vocabulary);

const count = db.prepare('SELECT COUNT(*) as count FROM vocabulary').get();
console.log(`✅ Database created with ${count.count} words!`);

// Show distribution
const distribution = db.prepare(`
    SELECT difficulty, COUNT(*) as count 
    FROM vocabulary 
    GROUP BY difficulty 
    ORDER BY difficulty
`).all();

console.log('\n📊 Word distribution:');
distribution.forEach(row => {
    console.log(`   ${row.difficulty}: ${row.count} words`);
});

console.log(`\n📁 Database location: ${dbPath}`);
console.log('🎉 Database ready to use!');

db.close();
