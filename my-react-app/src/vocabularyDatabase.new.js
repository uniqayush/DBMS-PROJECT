// Vocabulary Database - MySQL Backend Version
// This file now uses the API to interact with the MySQL database
import vocabularyAPI from './services/api.js';

// Helper functions that wrap the API calls
export const getWordsByDifficulty = async (difficulty) => {
    return await vocabularyAPI.getWordsByDifficulty(difficulty);
};

export const getWordsByCategory = async (category) => {
    return await vocabularyAPI.getWordsByCategory(category);
};

export const getRandomWord = async (excludeWords = []) => {
    const excludeWordsList = excludeWords.map(w => w.word);
    return await vocabularyAPI.getRandomWord(excludeWordsList);
};

export const getRandomWordByDifficulty = async (difficulty, excludeWords = []) => {
    const excludeWordsList = excludeWords.map(w => w.word);
    return await vocabularyAPI.getRandomWordByDifficulty(difficulty, excludeWordsList);
};

// Generate multiple choice options for a word
export const generateMultipleChoiceOptions = async (correctWord) => {
    return await vocabularyAPI.generateMultipleChoiceOptions(correctWord);
};

export const getAllCategories = async () => {
    return await vocabularyAPI.getAllCategories();
};

export const getAllDifficulties = async () => {
    return await vocabularyAPI.getAllDifficulties();
};

// Function to add new words
export const addNewWord = async (word, definition, difficulty = 'Intermediate', category = 'General') => {
    return await vocabularyAPI.addNewWord(word, definition, difficulty, category);
};

// Get all vocabulary words
export const getAllWords = async () => {
    return await vocabularyAPI.getAllWords();
};

/*
HOW TO ADD NEW WORDS:
Now that we're using a MySQL database, you can add words in two ways:

1. Through the API:
   - Use the addNewWord() function in your React components
   - Or make a POST request to http://localhost:5000/api/vocabulary

2. Directly in the database:
   - Connect to your MySQL database
   - Insert into the vocabulary table:
     INSERT INTO vocabulary (word, definition, difficulty, category) 
     VALUES ('YourWord', 'Definition here', 'Intermediate', 'General');

The system will automatically pick up new words from the database!
*/
