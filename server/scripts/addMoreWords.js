import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'lexilearn.db');

const db = new Database(dbPath);

// Additional vocabulary - Batch 2
const additionalWords = [
    // More Advanced Words
    { word: 'Cursory', definition: 'Hasty and therefore not thorough or detailed', difficulty: 'Advanced', category: 'General' },
    { word: 'Cynical', definition: 'Believing that people are motivated purely by self-interest', difficulty: 'Advanced', category: 'Character' },
    { word: 'Debacle', definition: 'A sudden and ignominious failure', difficulty: 'Advanced', category: 'General' },
    { word: 'Decorous', definition: 'In keeping with good taste and propriety', difficulty: 'Advanced', category: 'Character' },
    { word: 'Defamatory', definition: 'Damaging the good reputation of someone', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Deference', definition: 'Humble submission and respect', difficulty: 'Advanced', category: 'Social' },
    { word: 'Deft', definition: 'Neatly skillful and quick in movement', difficulty: 'Advanced', category: 'Skills' },
    { word: 'Deleterious', definition: 'Causing harm or damage', difficulty: 'Advanced', category: 'General' },
    { word: 'Delineate', definition: 'Describe or portray something precisely', difficulty: 'Advanced', category: 'Action' },
    { word: 'Demagogue', definition: 'A political leader who seeks support by appealing to popular desires', difficulty: 'Advanced', category: 'Politics' },
    { word: 'Demure', definition: 'Reserved, modest, and shy', difficulty: 'Advanced', category: 'Character' },
    { word: 'Denigrate', definition: 'To criticize unfairly; disparage', difficulty: 'Advanced', category: 'Action' },
    { word: 'Deride', definition: 'To express contempt for; ridicule', difficulty: 'Advanced', category: 'Action' },
    { word: 'Derivative', definition: 'Imitative of the work of another person', difficulty: 'Advanced', category: 'General' },
    { word: 'Desiccate', definition: 'To remove the moisture from; dry out', difficulty: 'Advanced', category: 'Action' },
    { word: 'Desultory', definition: 'Lacking a plan, purpose, or enthusiasm', difficulty: 'Advanced', category: 'General' },
    { word: 'Deterrent', definition: 'A thing that discourages or prevents action', difficulty: 'Advanced', category: 'General' },
    { word: 'Dexterous', definition: 'Showing or having skill in performing tasks', difficulty: 'Advanced', category: 'Skills' },
    { word: 'Didactic', definition: 'Intended to teach, particularly in moral instruction', difficulty: 'Advanced', category: 'Academic' },
    { word: 'Diffident', definition: 'Modest or shy because of a lack of self-confidence', difficulty: 'Advanced', category: 'Character' },
    { word: 'Digress', definition: 'To leave the main subject temporarily in speech', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Dilapidated', definition: 'In a state of disrepair or ruin', difficulty: 'Advanced', category: 'General' },
    { word: 'Dilatory', definition: 'Slow to act; intended to cause delay', difficulty: 'Advanced', category: 'Character' },
    { word: 'Diligent', definition: 'Having or showing care in one\'s work', difficulty: 'Advanced', category: 'Character' },
    { word: 'Diminutive', definition: 'Extremely or unusually small', difficulty: 'Advanced', category: 'General' },
    { word: 'Discern', definition: 'To perceive or recognize something', difficulty: 'Advanced', category: 'Action' },
    { word: 'Discreet', definition: 'Careful to avoid causing embarrassment', difficulty: 'Advanced', category: 'Character' },
    { word: 'Discrepancy', definition: 'A lack of compatibility between facts', difficulty: 'Advanced', category: 'General' },
    { word: 'Disdain', definition: 'The feeling that someone is unworthy of respect', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Disingenuous', definition: 'Not candid or sincere, typically pretending ignorance', difficulty: 'Advanced', category: 'Character' },
    { word: 'Disparage', definition: 'To regard or represent as being of little worth', difficulty: 'Advanced', category: 'Action' },
    { word: 'Disparate', definition: 'Essentially different in kind; not comparable', difficulty: 'Advanced', category: 'General' },
    { word: 'Dispassionate', definition: 'Not influenced by strong emotion; impartial', difficulty: 'Advanced', category: 'Character' },
    { word: 'Disseminate', definition: 'To spread or disperse widely', difficulty: 'Advanced', category: 'Action' },
    { word: 'Dissonance', definition: 'Lack of harmony among elements', difficulty: 'Advanced', category: 'General' },
    { word: 'Divergent', definition: 'Tending to be different or develop in different directions', difficulty: 'Advanced', category: 'General' },
    { word: 'Divulge', definition: 'To make known private or sensitive information', difficulty: 'Advanced', category: 'Action' },
    { word: 'Dogmatic', definition: 'Inclined to lay down principles as undeniably true', difficulty: 'Advanced', category: 'Character' },
    { word: 'Dormant', definition: 'Having normal physical functions suspended', difficulty: 'Advanced', category: 'General' },
    { word: 'Dubious', definition: 'Hesitating or doubting', difficulty: 'Advanced', category: 'Character' },
    { word: 'Ebullient', definition: 'Cheerful and full of energy', difficulty: 'Advanced', category: 'Character' },
    { word: 'Eccentric', definition: 'Unconventional and slightly strange', difficulty: 'Advanced', category: 'Character' },
    { word: 'Eclectic', definition: 'Deriving ideas from a broad range of sources', difficulty: 'Advanced', category: 'General' },
    { word: 'Efficacious', definition: 'Successful in producing a desired result', difficulty: 'Advanced', category: 'General' },
    { word: 'Effusive', definition: 'Expressing feelings of gratitude or approval', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Egregious', definition: 'Outstandingly bad; shocking', difficulty: 'Advanced', category: 'General' },
    { word: 'Elated', definition: 'Make someone ecstatically happy', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Elicit', definition: 'To evoke or draw out a response', difficulty: 'Advanced', category: 'Action' },
    { word: 'Elucidate', definition: 'To make something clear; explain', difficulty: 'Advanced', category: 'Action' },
    { word: 'Elusive', definition: 'Difficult to find, catch, or achieve', difficulty: 'Advanced', category: 'General' },
    
    // More Intermediate Words
    { word: 'Authority', definition: 'The power or right to give orders', difficulty: 'Intermediate', category: 'General' },
    { word: 'Available', definition: 'Able to be used or obtained', difficulty: 'Intermediate', category: 'General' },
    { word: 'Aware', definition: 'Having knowledge or perception of a situation', difficulty: 'Intermediate', category: 'General' },
    { word: 'Balance', definition: 'An even distribution of weight enabling stability', difficulty: 'Intermediate', category: 'General' },
    { word: 'Barrier', definition: 'A fence or other obstacle that prevents movement', difficulty: 'Intermediate', category: 'General' },
    { word: 'Behavior', definition: 'The way in which one acts or conducts oneself', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Belief', definition: 'An acceptance that something exists or is true', difficulty: 'Intermediate', category: 'General' },
    { word: 'Benefit', definition: 'An advantage or profit gained from something', difficulty: 'Intermediate', category: 'General' },
    { word: 'Bias', definition: 'Prejudice in favor of or against one thing', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Boundary', definition: 'A line that marks the limits of an area', difficulty: 'Intermediate', category: 'General' },
    { word: 'Brief', definition: 'Of short duration', difficulty: 'Intermediate', category: 'General' },
    { word: 'Brilliant', definition: 'Exceptionally clever or talented', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Broad', definition: 'Having a wide extent from side to side', difficulty: 'Intermediate', category: 'General' },
    { word: 'Budget', definition: 'An estimate of income and expenditure', difficulty: 'Intermediate', category: 'Finance' },
    { word: 'Burden', definition: 'A load, typically a heavy one', difficulty: 'Intermediate', category: 'General' },
    { word: 'Calculate', definition: 'To determine mathematically', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Capable', definition: 'Having the ability or qualities necessary', difficulty: 'Intermediate', category: 'Skills' },
    { word: 'Capacity', definition: 'The maximum amount that something can contain', difficulty: 'Intermediate', category: 'General' },
    { word: 'Capture', definition: 'To take into one\'s possession by force', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Career', definition: 'An occupation undertaken for a significant period', difficulty: 'Intermediate', category: 'Work' },
    { word: 'Careful', definition: 'Making sure of avoiding potential danger', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Category', definition: 'A class or division of people or things', difficulty: 'Intermediate', category: 'General' },
    { word: 'Cause', definition: 'A person or thing that gives rise to an action', difficulty: 'Intermediate', category: 'General' },
    { word: 'Caution', definition: 'Care taken to avoid danger or mistakes', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Celebrate', definition: 'To acknowledge a significant event with festivities', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Challenge', definition: 'A call to take part in a contest or competition', difficulty: 'Intermediate', category: 'General' },
    { word: 'Champion', definition: 'A person who has defeated all rivals', difficulty: 'Intermediate', category: 'General' },
    { word: 'Characteristic', definition: 'A feature or quality typical of a person', difficulty: 'Intermediate', category: 'General' },
    { word: 'Circumstance', definition: 'A fact or condition connected with an event', difficulty: 'Intermediate', category: 'General' },
    { word: 'Clarify', definition: 'To make a statement less confused', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Classic', definition: 'Judged over a period of time to be of high quality', difficulty: 'Intermediate', category: 'General' },
    { word: 'Collaborate', definition: 'To work jointly on an activity', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Colleague', definition: 'A person with whom one works', difficulty: 'Intermediate', category: 'Work' },
    { word: 'Collective', definition: 'Done by people acting as a group', difficulty: 'Intermediate', category: 'General' },
    { word: 'Combine', definition: 'To unite or merge to form a single entity', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Comfort', definition: 'A state of physical ease and freedom from pain', difficulty: 'Intermediate', category: 'General' },
    { word: 'Command', definition: 'To give an authoritative order', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Comment', definition: 'A verbal or written remark expressing an opinion', difficulty: 'Intermediate', category: 'Communication' },
    { word: 'Commerce', definition: 'The activity of buying and selling', difficulty: 'Intermediate', category: 'Business' },
    { word: 'Commitment', definition: 'The state of being dedicated to a cause', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Common', definition: 'Occurring, found, or done often', difficulty: 'Intermediate', category: 'General' },
    { word: 'Communicate', definition: 'To share or exchange information', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Community', definition: 'A group of people living in the same place', difficulty: 'Intermediate', category: 'Social' },
    { word: 'Compare', definition: 'To estimate or measure similarities', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Compassion', definition: 'Sympathetic pity and concern for others', difficulty: 'Intermediate', category: 'Emotion' },
    { word: 'Compatible', definition: 'Able to exist or occur together without conflict', difficulty: 'Intermediate', category: 'General' },
    { word: 'Compensate', definition: 'To give something to make up for loss', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Competent', definition: 'Having the necessary ability or knowledge', difficulty: 'Intermediate', category: 'Skills' },
    { word: 'Competition', definition: 'The activity of competing against others', difficulty: 'Intermediate', category: 'General' },
    { word: 'Complete', definition: 'Having all the necessary parts', difficulty: 'Intermediate', category: 'General' },
    
    // More Beginner Words
    { word: 'Answer', definition: 'A thing said or written in reaction to a question', difficulty: 'Beginner', category: 'Communication' },
    { word: 'Any', definition: 'Used to refer to one or some of a thing', difficulty: 'Beginner', category: 'General' },
    { word: 'Anybody', definition: 'Any person or people', difficulty: 'Beginner', category: 'General' },
    { word: 'Anyone', definition: 'Any person or people', difficulty: 'Beginner', category: 'General' },
    { word: 'Anything', definition: 'Used to refer to a thing, no matter what', difficulty: 'Beginner', category: 'General' },
    { word: 'Anyway', definition: 'Used to confirm or support a point', difficulty: 'Beginner', category: 'General' },
    { word: 'Anywhere', definition: 'In or to any place', difficulty: 'Beginner', category: 'General' },
    { word: 'Apart', definition: 'Separated by a distance', difficulty: 'Beginner', category: 'General' },
    { word: 'Apparent', definition: 'Clearly visible or understood', difficulty: 'Beginner', category: 'General' },
    { word: 'Appear', definition: 'To come into sight; become visible', difficulty: 'Beginner', category: 'Action' },
    { word: 'Apply', definition: 'To make a formal request for something', difficulty: 'Beginner', category: 'Action' },
    { word: 'Appoint', definition: 'To assign a job or role to someone', difficulty: 'Beginner', category: 'Action' },
    { word: 'Approach', definition: 'To come near or nearer to someone', difficulty: 'Beginner', category: 'Action' },
    { word: 'Appropriate', definition: 'Suitable or proper in the circumstances', difficulty: 'Beginner', category: 'General' },
    { word: 'Approve', definition: 'To officially agree to or accept', difficulty: 'Beginner', category: 'Action' },
    { word: 'Area', definition: 'A region or part of a town or country', difficulty: 'Beginner', category: 'General' },
    { word: 'Argue', definition: 'To give reasons for or against something', difficulty: 'Beginner', category: 'Action' },
    { word: 'Argument', definition: 'An exchange of diverging views', difficulty: 'Beginner', category: 'Communication' },
    { word: 'Arise', definition: 'To emerge; become apparent', difficulty: 'Beginner', category: 'Action' },
    { word: 'Arm', definition: 'Each of the upper limbs of the human body', difficulty: 'Beginner', category: 'Body' },
    { word: 'Around', definition: 'Located or situated on every side', difficulty: 'Beginner', category: 'General' },
    { word: 'Arrange', definition: 'To put things in a neat or attractive order', difficulty: 'Beginner', category: 'Action' },
    { word: 'Arrest', definition: 'To seize someone by legal authority', difficulty: 'Beginner', category: 'Action' },
    { word: 'Arrive', definition: 'To reach a place at the end of a journey', difficulty: 'Beginner', category: 'Action' },
    { word: 'Art', definition: 'The expression of creative skill and imagination', difficulty: 'Beginner', category: 'Art' },
    { word: 'Article', definition: 'A particular item or object', difficulty: 'Beginner', category: 'General' },
    { word: 'Artist', definition: 'A person who creates art', difficulty: 'Beginner', category: 'Art' },
    { word: 'Ask', definition: 'To say something to obtain an answer', difficulty: 'Beginner', category: 'Communication' },
    { word: 'Aspect', definition: 'A particular part or feature of something', difficulty: 'Beginner', category: 'General' },
    { word: 'Assembly', definition: 'A group of people gathered together', difficulty: 'Beginner', category: 'Social' },
    { word: 'Asset', definition: 'A useful or valuable thing or person', difficulty: 'Beginner', category: 'General' },
    { word: 'Associate', definition: 'To connect someone or something with another', difficulty: 'Beginner', category: 'Action' },
    { word: 'Association', definition: 'A group of people organized for a joint purpose', difficulty: 'Beginner', category: 'Social' },
    { word: 'Assume', definition: 'To suppose something is true without proof', difficulty: 'Beginner', category: 'Action' },
    { word: 'Assure', definition: 'To tell someone confidently', difficulty: 'Beginner', category: 'Communication' },
    { word: 'Atmosphere', definition: 'The envelope of gases surrounding the earth', difficulty: 'Beginner', category: 'Nature' },
    { word: 'Attach', definition: 'To fasten or join one thing to another', difficulty: 'Beginner', category: 'Action' },
    { word: 'Attack', definition: 'To take aggressive action against', difficulty: 'Beginner', category: 'Action' },
    { word: 'Attempt', definition: 'To make an effort to achieve something', difficulty: 'Beginner', category: 'Action' },
    { word: 'Attend', definition: 'To be present at an event', difficulty: 'Beginner', category: 'Action' },
    { word: 'Attention', definition: 'Notice taken of someone or something', difficulty: 'Beginner', category: 'General' },
    { word: 'Attitude', definition: 'A settled way of thinking or feeling', difficulty: 'Beginner', category: 'Character' },
    { word: 'Attorney', definition: 'A person appointed to act for another in legal matters', difficulty: 'Beginner', category: 'Law' },
    { word: 'Attract', definition: 'To cause to come to a place or participate', difficulty: 'Beginner', category: 'Action' },
    { word: 'Attractive', definition: 'Pleasing or appealing to the senses', difficulty: 'Beginner', category: 'General' },
    { word: 'Audience', definition: 'The assembled spectators or listeners', difficulty: 'Beginner', category: 'Social' },
    { word: 'Author', definition: 'A writer of a book or article', difficulty: 'Beginner', category: 'General' },
    { word: 'Automatic', definition: 'Working by itself with little human control', difficulty: 'Beginner', category: 'Technology' },
    { word: 'Autumn', definition: 'The season after summer and before winter', difficulty: 'Beginner', category: 'Nature' },
    { word: 'Average', definition: 'A number expressing the central value', difficulty: 'Beginner', category: 'General' },
];

console.log(`📝 Adding ${additionalWords.length} more words...`);

const insert = db.prepare(
    'INSERT OR IGNORE INTO vocabulary (word, definition, difficulty, category) VALUES (?, ?, ?, ?)'
);

const insertMany = db.transaction((vocabList) => {
    for (const vocab of vocabList) {
        insert.run(vocab.word, vocab.definition, vocab.difficulty, vocab.category);
    }
});

insertMany(additionalWords);

const count = db.prepare('SELECT COUNT(*) as count FROM vocabulary').get();
console.log(`✅ Total words in database: ${count.count}`);

const distribution = db.prepare(`
    SELECT difficulty, COUNT(*) as count 
    FROM vocabulary 
    GROUP BY difficulty 
    ORDER BY difficulty
`).all();

console.log('\n📊 Updated distribution:');
distribution.forEach(row => {
    console.log(`   ${row.difficulty}: ${row.count} words`);
});

db.close();
console.log('\n🎉 Words added successfully!');
