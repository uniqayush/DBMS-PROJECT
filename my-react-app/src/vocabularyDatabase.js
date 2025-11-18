// Vocabulary Database
// To add new words, simply add them to the vocabularyWords array below
// Each word should have: word, definition, difficulty, category (optional)

export const vocabularyWords = [
    // Advanced Words
    {
        word: 'Serendipity',
        definition: 'The occurrence and development of events by chance in a happy or beneficial way',
        difficulty: 'Advanced',
        category: 'General'
    },
    {
        word: 'Ephemeral',
        definition: 'Lasting for a very short time',
        difficulty: 'Advanced',
        category: 'General'
    },
    {
        word: 'Ubiquitous',
        definition: 'Present, appearing, or found everywhere',
        difficulty: 'Advanced',
        category: 'General'
    },
    {
        word: 'Meticulous',
        definition: 'Showing great attention to detail; very careful and precise',
        difficulty: 'Advanced',
        category: 'General'
    },
    {
        word: 'Perspicacious',
        definition: 'Having a ready insight into and understanding of things',
        difficulty: 'Advanced',
        category: 'General'
    },
    {
        word: 'Magnanimous',
        definition: 'Very generous or forgiving, especially toward a rival or someone less powerful',
        difficulty: 'Advanced',
        category: 'Character'
    },

    // Intermediate Words
    {
        word: 'Resilient',
        definition: 'Able to withstand or recover quickly from difficult conditions',
        difficulty: 'Intermediate',
        category: 'Character'
    },
    {
        word: 'Eloquent',
        definition: 'Fluent or persuasive in speaking or writing',
        difficulty: 'Intermediate',
        category: 'Communication'
    },
    {
        word: 'Pragmatic',
        definition: 'Dealing with things sensibly and realistically in a way that is based on practical rather than idealistic considerations',
        difficulty: 'Intermediate',
        category: 'General'
    },
    {
        word: 'Tenacious',
        definition: 'Tending to keep a firm hold of something; clinging or adhering closely',
        difficulty: 'Intermediate',
        category: 'Character'
    },
    {
        word: 'Versatile',
        definition: 'Able to adapt or be adapted to many different functions or activities',
        difficulty: 'Intermediate',
        category: 'Skills'
    },
    {
        word: 'Diligent',
        definition: 'Having or showing care and conscientiousness in one\'s work or duties',
        difficulty: 'Intermediate',
        category: 'Character'
    },

    // Beginner Words
    {
        word: 'Innovative',
        definition: 'Featuring new methods; advanced and original',
        difficulty: 'Beginner',
        category: 'Skills'
    },
    {
        word: 'Ambitious',
        definition: 'Having or showing a strong desire and determination to succeed',
        difficulty: 'Beginner',
        category: 'Character'
    },
    {
        word: 'Confident',
        definition: 'Feeling or showing certainty about something',
        difficulty: 'Beginner',
        category: 'Character'
    },
    {
        word: 'Creative',
        definition: 'Relating to or involving the imagination or original ideas',
        difficulty: 'Beginner',
        category: 'Skills'
    },
    {
        word: 'Enthusiastic',
        definition: 'Having or showing intense and eager enjoyment, interest, or approval',
        difficulty: 'Beginner',
        category: 'Character'
    },
    {
        word: 'Reliable',
        definition: 'Consistently good in quality or performance; able to be trusted',
        difficulty: 'Beginner',
        category: 'Character'
    }
];

// Helper functions for the database
export const getWordsByDifficulty = (difficulty) => {
    return vocabularyWords.filter(word => word.difficulty === difficulty);
};

export const getWordsByCategory = (category) => {
    return vocabularyWords.filter(word => word.category === category);
};

export const getRandomWord = (excludeWords = []) => {
    const excludeWordsList = excludeWords.map(w => w.word);
    const availableWords = vocabularyWords.filter(word => !excludeWordsList.includes(word.word));
    
    if (availableWords.length === 0) return null; // All words learned
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
};

export const getRandomWordByDifficulty = (difficulty, excludeWords = []) => {
    const excludeWordsList = excludeWords.map(w => w.word);
    const wordsInDifficulty = getWordsByDifficulty(difficulty).filter(
        word => !excludeWordsList.includes(word.word)
    );
    
    if (wordsInDifficulty.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * wordsInDifficulty.length);
    return wordsInDifficulty[randomIndex];
};

// Generate multiple choice options for a word
export const generateMultipleChoiceOptions = (correctWord) => {
    // Get 3 random incorrect words
    const otherWords = vocabularyWords.filter(word => word.word !== correctWord.word);
    const shuffledWords = otherWords.sort(() => 0.5 - Math.random());
    const incorrectOptions = shuffledWords.slice(0, 3);
    
    // Combine correct and incorrect options
    const allOptions = [correctWord, ...incorrectOptions];
    
    // Shuffle all options
    return allOptions.sort(() => 0.5 - Math.random());
};

export const getAllCategories = () => {
    return [...new Set(vocabularyWords.map(word => word.category))];
};

export const getAllDifficulties = () => {
    return [...new Set(vocabularyWords.map(word => word.difficulty))];
};

// Function to add new words (for future expansion)
export const addNewWord = (word, definition, difficulty = 'Intermediate', category = 'General') => {
    const newWord = {
        word,
        definition,
        difficulty,
        category
    };
    vocabularyWords.push(newWord);
    return newWord;
};

/*
HOW TO ADD NEW WORDS:
1. Simply add a new object to the vocabularyWords array above
2. Each word object should have these properties:
   - word: The vocabulary word (string)
   - definition: The meaning of the word (string)
   - difficulty: 'Beginner', 'Intermediate', or 'Advanced' (string)
   - category: Any category you want (string) - optional

Example:
{
    word: 'Example',
    definition: 'A thing characteristic of its kind or illustrating a general rule',
    difficulty: 'Beginner',
    category: 'General'
}

The system will automatically pick up new words you add here!
*/
