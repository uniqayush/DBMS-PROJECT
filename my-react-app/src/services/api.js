// API Service for LexiLearn
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class VocabularyAPI {
    // Get all vocabulary words
    async getAllWords() {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary`);
            if (!response.ok) throw new Error('Failed to fetch vocabulary');
            return await response.json();
        } catch (error) {
            console.error('Error fetching all words:', error);
            throw error;
        }
    }

    // Get words by difficulty
    async getWordsByDifficulty(difficulty) {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/difficulty/${difficulty}`);
            if (!response.ok) throw new Error('Failed to fetch words by difficulty');
            return await response.json();
        } catch (error) {
            console.error('Error fetching words by difficulty:', error);
            throw error;
        }
    }

    // Get words by category
    async getWordsByCategory(category) {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/category/${category}`);
            if (!response.ok) throw new Error('Failed to fetch words by category');
            return await response.json();
        } catch (error) {
            console.error('Error fetching words by category:', error);
            throw error;
        }
    }

    // Get a random word (optionally excluding certain words)
    async getRandomWord(excludeWords = []) {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/random`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ excludeWords }),
            });
            if (!response.ok) throw new Error('Failed to fetch random word');
            return await response.json();
        } catch (error) {
            console.error('Error fetching random word:', error);
            throw error;
        }
    }

    // Get a random word by difficulty (optionally excluding certain words)
    async getRandomWordByDifficulty(difficulty, excludeWords = []) {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/random/difficulty/${difficulty}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ excludeWords }),
            });
            if (!response.ok) throw new Error('Failed to fetch random word by difficulty');
            return await response.json();
        } catch (error) {
            console.error('Error fetching random word by difficulty:', error);
            throw error;
        }
    }

    // Generate multiple choice options for a word
    async generateMultipleChoiceOptions(correctWord) {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/multiple-choice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correctWord }),
            });
            if (!response.ok) throw new Error('Failed to generate multiple choice options');
            return await response.json();
        } catch (error) {
            console.error('Error generating multiple choice options:', error);
            throw error;
        }
    }

    // Get all categories
    async getAllCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/categories`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    // Get all difficulties
    async getAllDifficulties() {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/difficulties`);
            if (!response.ok) throw new Error('Failed to fetch difficulties');
            return await response.json();
        } catch (error) {
            console.error('Error fetching difficulties:', error);
            throw error;
        }
    }

    // Add a new word
    async addNewWord(word, definition, difficulty = 'Intermediate', category = 'General') {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, definition, difficulty, category }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to add word');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding new word:', error);
            throw error;
        }
    }

    // Update a word
    async updateWord(id, word, definition, difficulty, category) {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, definition, difficulty, category }),
            });
            if (!response.ok) throw new Error('Failed to update word');
            return await response.json();
        } catch (error) {
            console.error('Error updating word:', error);
            throw error;
        }
    }

    // Delete a word
    async deleteWord(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/vocabulary/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete word');
            return await response.json();
        } catch (error) {
            console.error('Error deleting word:', error);
            throw error;
        }
    }

    // Health check
    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            if (!response.ok) throw new Error('API is not responding');
            return await response.json();
        } catch (error) {
            console.error('Error checking API health:', error);
            throw error;
        }
    }
}

// Export a singleton instance
export const vocabularyAPI = new VocabularyAPI();
export default vocabularyAPI;
