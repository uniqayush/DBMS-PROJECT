import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'lexilearn.db');

const db = new Database(dbPath);

// Generate comprehensive word list programmatically
const prefixes = ['Pre', 'Post', 'Re', 'Un', 'Dis', 'Over', 'Under', 'Out', 'Up', 'Down', 'In', 'Ex', 'Sub', 'Super', 'Trans', 'Inter', 'Intra', 'Anti', 'Pro', 'Con'];
const roots = ['dict', 'scribe', 'port', 'ject', 'mit', 'fer', 'duct', 'struct', 'tract', 'vert', 'form', 'press', 'pose', 'cede', 'clude', 'voke', 'tend', 'pend', 'sist', 'spect'];

// Comprehensive word list - continuing from where we left off
const bulkWords = [
    // Advanced vocabulary continuation
    { word: 'Emulate', definition: 'To match or surpass by imitation', difficulty: 'Advanced', category: 'Action' },
    { word: 'Enervate', definition: 'To cause someone to feel drained of energy', difficulty: 'Advanced', category: 'Action' },
    { word: 'Engender', definition: 'To cause or give rise to a feeling or situation', difficulty: 'Advanced', category: 'Action' },
    { word: 'Enigmatic', definition: 'Difficult to interpret or understand; mysterious', difficulty: 'Advanced', category: 'General' },
    { word: 'Enmity', definition: 'A state or feeling of active opposition or hostility', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Ennui', definition: 'A feeling of listlessness and dissatisfaction', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Enumerate', definition: 'To mention a number of things one by one', difficulty: 'Advanced', category: 'Action' },
    { word: 'Ephemeral', definition: 'Lasting for a very short time', difficulty: 'Advanced', category: 'General' },
    { word: 'Equanimity', definition: 'Mental calmness and evenness of temper', difficulty: 'Advanced', category: 'Character' },
    { word: 'Equivocal', definition: 'Open to more than one interpretation; ambiguous', difficulty: 'Advanced', category: 'General' },
    { word: 'Erudite', definition: 'Having or showing great knowledge or learning', difficulty: 'Advanced', category: 'Academic' },
    { word: 'Esoteric', definition: 'Intended for or understood by only a small group', difficulty: 'Advanced', category: 'General' },
    { word: 'Estimable', definition: 'Worthy of great respect', difficulty: 'Advanced', category: 'Character' },
    { word: 'Ethereal', definition: 'Extremely delicate and light', difficulty: 'Advanced', category: 'General' },
    { word: 'Euphemism', definition: 'A mild expression substituted for one considered harsh', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Evanescent', definition: 'Soon passing out of sight or existence', difficulty: 'Advanced', category: 'General' },
    { word: 'Exacerbate', definition: 'To make a problem or bad situation worse', difficulty: 'Advanced', category: 'Action' },
    { word: 'Exacting', definition: 'Making great demands on skill or attention', difficulty: 'Advanced', category: 'General' },
    { word: 'Exalt', definition: 'To hold someone in very high regard', difficulty: 'Advanced', category: 'Action' },
    { word: 'Exasperate', definition: 'To irritate intensely; infuriate', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Exemplary', definition: 'Serving as a desirable model; very good', difficulty: 'Advanced', category: 'General' },
    { word: 'Exhaustive', definition: 'Examining or including all elements', difficulty: 'Advanced', category: 'General' },
    { word: 'Exhort', definition: 'To strongly encourage or urge someone to do something', difficulty: 'Advanced', category: 'Action' },
    { word: 'Exigent', definition: 'Pressing; demanding', difficulty: 'Advanced', category: 'General' },
    { word: 'Exonerate', definition: 'To absolve someone from blame', difficulty: 'Advanced', category: 'Action' },
    { word: 'Expedient', definition: 'Convenient and practical although possibly improper', difficulty: 'Advanced', category: 'General' },
    { word: 'Expedite', definition: 'To make an action happen sooner or be accomplished more quickly', difficulty: 'Advanced', category: 'Action' },
    { word: 'Explicit', definition: 'Stated clearly and in detail', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Exploit', definition: 'To make full use of and derive benefit from', difficulty: 'Advanced', category: 'Action' },
    { word: 'Expound', definition: 'To present and explain a theory or idea systematically', difficulty: 'Advanced', category: 'Communication' },
    { word: 'Extol', definition: 'To praise enthusiastically', difficulty: 'Advanced', category: 'Action' },
    { word: 'Extraneous', definition: 'Irrelevant or unrelated to the subject', difficulty: 'Advanced', category: 'General' },
    { word: 'Extrapolate', definition: 'To extend the application of a method or conclusion', difficulty: 'Advanced', category: 'Action' },
    { word: 'Extricate', definition: 'To free someone from a difficult situation', difficulty: 'Advanced', category: 'Action' },
    { word: 'Exuberant', definition: 'Filled with lively energy and excitement', difficulty: 'Advanced', category: 'Character' },
    { word: 'Fabricate', definition: 'To invent or concoct something false', difficulty: 'Advanced', category: 'Action' },
    { word: 'Facetious', definition: 'Treating serious issues with deliberately inappropriate humor', difficulty: 'Advanced', category: 'Character' },
    { word: 'Facilitate', definition: 'To make an action or process easy or easier', difficulty: 'Advanced', category: 'Action' },
    { word: 'Fallacious', definition: 'Based on a mistaken belief', difficulty: 'Advanced', category: 'General' },
    { word: 'Fastidious', definition: 'Very attentive to accuracy and detail', difficulty: 'Advanced', category: 'Character' },
    { word: 'Fatuous', definition: 'Silly and pointless', difficulty: 'Advanced', category: 'General' },
    { word: 'Feasible', definition: 'Possible to do easily or conveniently', difficulty: 'Advanced', category: 'General' },
    { word: 'Feckless', definition: 'Lacking initiative or strength of character', difficulty: 'Advanced', category: 'Character' },
    { word: 'Fecund', definition: 'Producing or capable of producing abundant growth', difficulty: 'Advanced', category: 'General' },
    { word: 'Fervent', definition: 'Having or displaying passionate intensity', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Fervid', definition: 'Intensely enthusiastic or passionate', difficulty: 'Advanced', category: 'Emotion' },
    { word: 'Flagrant', definition: 'Conspicuously or obviously offensive', difficulty: 'Advanced', category: 'General' },
    { word: 'Fledgling', definition: 'A person or organization that is new and inexperienced', difficulty: 'Advanced', category: 'General' },
    { word: 'Flippant', definition: 'Not showing proper respect or seriousness', difficulty: 'Advanced', category: 'Character' },
    { word: 'Florid', definition: 'Having a red or flushed complexion', difficulty: 'Advanced', category: 'General' },
    
    // Intermediate words continuation
    { word: 'Complex', definition: 'Consisting of many different parts', difficulty: 'Intermediate', category: 'General' },
    { word: 'Complicate', definition: 'To make something more difficult', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Component', definition: 'A part or element of a larger whole', difficulty: 'Intermediate', category: 'General' },
    { word: 'Compose', definition: 'To write or create a work of art', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Compound', definition: 'A thing composed of two or more separate elements', difficulty: 'Intermediate', category: 'General' },
    { word: 'Comprehensive', definition: 'Complete and including everything necessary', difficulty: 'Intermediate', category: 'General' },
    { word: 'Comprise', definition: 'To consist of; be made up of', difficulty: 'Intermediate', category: 'General' },
    { word: 'Compromise', definition: 'An agreement reached by each side making concessions', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Compulsory', definition: 'Required by law or a rule; obligatory', difficulty: 'Intermediate', category: 'General' },
    { word: 'Conceal', definition: 'To keep from sight; hide', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Concede', definition: 'To admit that something is true after denying it', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Conceive', definition: 'To form or devise a plan in the mind', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Concentrate', definition: 'To focus all attention on a particular object', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Concept', definition: 'An abstract idea or general notion', difficulty: 'Intermediate', category: 'General' },
    { word: 'Concern', definition: 'A matter of interest or importance', difficulty: 'Intermediate', category: 'General' },
    { word: 'Conclude', definition: 'To bring something to an end', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Concrete', definition: 'Existing in a material form; real', difficulty: 'Intermediate', category: 'General' },
    { word: 'Condemn', definition: 'To express complete disapproval of', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Condition', definition: 'The state of something with regard to appearance', difficulty: 'Intermediate', category: 'General' },
    { word: 'Conduct', definition: 'To organize and carry out', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Conference', definition: 'A formal meeting for discussion', difficulty: 'Intermediate', category: 'Social' },
    { word: 'Confess', definition: 'To admit that one has committed a crime', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Confidence', definition: 'The feeling of self-assurance', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Confine', definition: 'To keep within certain limits', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Confirm', definition: 'To establish the truth or correctness of', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Conflict', definition: 'A serious disagreement or argument', difficulty: 'Intermediate', category: 'General' },
    { word: 'Conform', definition: 'To comply with rules or standards', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Confront', definition: 'To meet someone face to face with hostile intent', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Confuse', definition: 'To make someone bewildered or perplexed', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Congratulate', definition: 'To give someone praise for an achievement', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Connect', definition: 'To bring together or into contact', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Conquer', definition: 'To overcome and take control by military force', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Conscience', definition: 'An inner feeling acting as a guide to right and wrong', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Conscious', definition: 'Aware of and responding to surroundings', difficulty: 'Intermediate', category: 'General' },
    { word: 'Consecutive', definition: 'Following continuously', difficulty: 'Intermediate', category: 'General' },
    { word: 'Consensus', definition: 'General agreement', difficulty: 'Intermediate', category: 'Social' },
    { word: 'Consent', definition: 'Permission for something to happen', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Consequence', definition: 'A result or effect of an action', difficulty: 'Intermediate', category: 'General' },
    { word: 'Consequent', definition: 'Following as a result or effect', difficulty: 'Intermediate', category: 'General' },
    { word: 'Conservative', definition: 'Holding traditional values and cautious about change', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Consider', definition: 'To think carefully about something', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Considerable', definition: 'Notably large in size or amount', difficulty: 'Intermediate', category: 'General' },
    { word: 'Considerate', definition: 'Careful not to cause inconvenience to others', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Consist', definition: 'To be composed or made up of', difficulty: 'Intermediate', category: 'General' },
    { word: 'Consistent', definition: 'Acting in the same way over time', difficulty: 'Intermediate', category: 'Character' },
    { word: 'Consolidate', definition: 'To make something physically stronger or more solid', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Constant', definition: 'Occurring continuously over a period of time', difficulty: 'Intermediate', category: 'General' },
    { word: 'Constitute', definition: 'To be a part of a whole', difficulty: 'Intermediate', category: 'General' },
    { word: 'Constrain', definition: 'To severely restrict the scope or activity of', difficulty: 'Intermediate', category: 'Action' },
    { word: 'Construct', definition: 'To build or make something', difficulty: 'Intermediate', category: 'Action' },
    
    // Beginner words continuation
    { word: 'Avoid', definition: 'To keep away from or stop oneself from doing', difficulty: 'Beginner', category: 'Action' },
    { word: 'Await', definition: 'To wait for an event', difficulty: 'Beginner', category: 'Action' },
    { word: 'Awake', definition: 'To stop sleeping; wake from sleep', difficulty: 'Beginner', category: 'Action' },
    { word: 'Award', definition: 'To give or order the giving of something', difficulty: 'Beginner', category: 'Action' },
    { word: 'Aware', definition: 'Having knowledge or perception of a situation', difficulty: 'Beginner', category: 'General' },
    { word: 'Away', definition: 'To or at a distance from a place', difficulty: 'Beginner', category: 'General' },
    { word: 'Baby', definition: 'A very young child', difficulty: 'Beginner', category: 'General' },
    { word: 'Back', definition: 'The rear surface of the human body', difficulty: 'Beginner', category: 'Body' },
    { word: 'Background', definition: 'The area or scenery behind the main object', difficulty: 'Beginner', category: 'General' },
    { word: 'Bad', definition: 'Of poor quality or low standard', difficulty: 'Beginner', category: 'General' },
    { word: 'Bag', definition: 'A container made of flexible material', difficulty: 'Beginner', category: 'General' },
    { word: 'Ball', definition: 'A solid or hollow sphere', difficulty: 'Beginner', category: 'General' },
    { word: 'Ban', definition: 'To officially forbid something', difficulty: 'Beginner', category: 'Action' },
    { word: 'Band', definition: 'A flat, thin strip or loop of material', difficulty: 'Beginner', category: 'General' },
    { word: 'Bank', definition: 'A financial establishment', difficulty: 'Beginner', category: 'Finance' },
    { word: 'Bar', definition: 'A long rigid piece of wood or metal', difficulty: 'Beginner', category: 'General' },
    { word: 'Bare', definition: 'Not clothed or covered', difficulty: 'Beginner', category: 'General' },
    { word: 'Bargain', definition: 'An agreement between two parties', difficulty: 'Beginner', category: 'Action' },
    { word: 'Barrier', definition: 'A fence or obstacle that prevents movement', difficulty: 'Beginner', category: 'General' },
    { word: 'Base', definition: 'The lowest part or edge of something', difficulty: 'Beginner', category: 'General' },
    { word: 'Basic', definition: 'Forming an essential foundation', difficulty: 'Beginner', category: 'General' },
    { word: 'Basis', definition: 'The underlying support or foundation', difficulty: 'Beginner', category: 'General' },
    { word: 'Battle', definition: 'A sustained fight between organized forces', difficulty: 'Beginner', category: 'Action' },
    { word: 'Beach', definition: 'A pebbly or sandy shore by the ocean', difficulty: 'Beginner', category: 'Nature' },
    { word: 'Bear', definition: 'To carry the weight of; support', difficulty: 'Beginner', category: 'Action' },
    { word: 'Beat', definition: 'To strike repeatedly', difficulty: 'Beginner', category: 'Action' },
    { word: 'Beautiful', definition: 'Pleasing the senses or mind aesthetically', difficulty: 'Beginner', category: 'General' },
    { word: 'Beauty', definition: 'A combination of qualities that pleases the senses', difficulty: 'Beginner', category: 'General' },
    { word: 'Because', definition: 'For the reason that; since', difficulty: 'Beginner', category: 'General' },
    { word: 'Become', definition: 'To begin to be', difficulty: 'Beginner', category: 'Action' },
    { word: 'Bed', definition: 'A piece of furniture for sleep or rest', difficulty: 'Beginner', category: 'General' },
    { word: 'Before', definition: 'During the period of time preceding', difficulty: 'Beginner', category: 'General' },
    { word: 'Begin', definition: 'To start; perform the first part of an action', difficulty: 'Beginner', category: 'Action' },
    { word: 'Beginning', definition: 'The point in time or space at which something starts', difficulty: 'Beginner', category: 'General' },
    { word: 'Behave', definition: 'To act in a particular way', difficulty: 'Beginner', category: 'Action' },
    { word: 'Behind', definition: 'At or to the far side of something', difficulty: 'Beginner', category: 'General' },
    { word: 'Believe', definition: 'To accept something as true', difficulty: 'Beginner', category: 'Action' },
    { word: 'Bell', definition: 'A hollow metal object that makes a ringing sound', difficulty: 'Beginner', category: 'General' },
    { word: 'Belong', definition: 'To be the property of', difficulty: 'Beginner', category: 'General' },
    { word: 'Below', definition: 'At a lower level or layer', difficulty: 'Beginner', category: 'General' },
    { word: 'Belt', definition: 'A strip of leather worn around the waist', difficulty: 'Beginner', category: 'General' },
    { word: 'Bench', definition: 'A long seat for several people', difficulty: 'Beginner', category: 'General' },
    { word: 'Bend', definition: 'To shape or force something into a curve', difficulty: 'Beginner', category: 'Action' },
    { word: 'Beneath', definition: 'Extending or directly underneath', difficulty: 'Beginner', category: 'General' },
    { word: 'Beside', definition: 'At the side of; next to', difficulty: 'Beginner', category: 'General' },
    { word: 'Best', definition: 'Of the most excellent or desirable type', difficulty: 'Beginner', category: 'General' },
    { word: 'Better', definition: 'Of a more excellent or effective type', difficulty: 'Beginner', category: 'General' },
    { word: 'Between', definition: 'At, into, or across the space separating two objects', difficulty: 'Beginner', category: 'General' },
    { word: 'Beyond', definition: 'At or to the further side of', difficulty: 'Beginner', category: 'General' },
    { word: 'Big', definition: 'Of considerable size or extent', difficulty: 'Beginner', category: 'General' },
];

console.log(`📝 Adding ${bulkWords.length} more words...`);

const insert = db.prepare(
    'INSERT OR IGNORE INTO vocabulary (word, definition, difficulty, category) VALUES (?, ?, ?, ?)'
);

const insertMany = db.transaction((vocabList) => {
    for (const vocab of vocabList) {
        insert.run(vocab.word, vocab.definition, vocab.difficulty, vocab.category);
    }
});

insertMany(bulkWords);

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
