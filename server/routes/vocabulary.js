import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Get all vocabulary words
router.get('/', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM vocabulary ORDER BY word ASC').all();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
        res.status(500).json({ error: 'Failed to fetch vocabulary' });
    }
});

// Get words by difficulty
router.get('/difficulty/:difficulty', (req, res) => {
    try {
        const { difficulty } = req.params;
        const rows = db.prepare(
            'SELECT * FROM vocabulary WHERE difficulty = ? ORDER BY word ASC'
        ).all(difficulty);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching words by difficulty:', error);
        res.status(500).json({ error: 'Failed to fetch words' });
    }
});

// Get words by category
router.get('/category/:category', (req, res) => {
    try {
        const { category } = req.params;
        const rows = db.prepare(
            'SELECT * FROM vocabulary WHERE category = ? ORDER BY word ASC'
        ).all(category);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching words by category:', error);
        res.status(500).json({ error: 'Failed to fetch words' });
    }
});

// Get a random word (optionally excluding certain words)
router.post('/random', (req, res) => {
    try {
        const { excludeWords = [] } = req.body;
        
        let query = 'SELECT * FROM vocabulary';
        const params = [];
        
        if (excludeWords.length > 0) {
            const placeholders = excludeWords.map(() => '?').join(',');
            query += ` WHERE word NOT IN (${placeholders})`;
            params.push(...excludeWords);
        }
        
        query += ' ORDER BY RANDOM() LIMIT 1';
        
        const row = db.prepare(query).get(...params);
        
        if (!row) {
            return res.json(null);
        }
        
        res.json(row);
    } catch (error) {
        console.error('Error fetching random word:', error);
        res.status(500).json({ error: 'Failed to fetch random word' });
    }
});

// Get a random word by difficulty (optionally excluding certain words)
router.post('/random/difficulty/:difficulty', (req, res) => {
    try {
        const { difficulty } = req.params;
        const { excludeWords = [] } = req.body;
        
        let query = 'SELECT * FROM vocabulary WHERE difficulty = ?';
        const params = [difficulty];
        
        if (excludeWords.length > 0) {
            const placeholders = excludeWords.map(() => '?').join(',');
            query += ` AND word NOT IN (${placeholders})`;
            params.push(...excludeWords);
        }
        
        query += ' ORDER BY RANDOM() LIMIT 1';
        
        const row = db.prepare(query).get(...params);
        
        if (!row) {
            return res.json(null);
        }
        
        res.json(row);
    } catch (error) {
        console.error('Error fetching random word by difficulty:', error);
        res.status(500).json({ error: 'Failed to fetch random word' });
    }
});

// Get multiple choice options for a word
router.post('/multiple-choice', (req, res) => {
    try {
        const { correctWord } = req.body;
        
        if (!correctWord || !correctWord.word) {
            return res.status(400).json({ error: 'correctWord is required' });
        }
        
        // Get 3 random incorrect words
        const incorrectWords = db.prepare(
            'SELECT * FROM vocabulary WHERE word != ? ORDER BY RANDOM() LIMIT 3'
        ).all(correctWord.word);
        
        // Combine and shuffle
        const allOptions = [correctWord, ...incorrectWords];
        
        // Fisher-Yates shuffle
        for (let i = allOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
        }
        
        res.json(allOptions);
    } catch (error) {
        console.error('Error generating multiple choice options:', error);
        res.status(500).json({ error: 'Failed to generate options' });
    }
});

// Get all categories
router.get('/categories', (req, res) => {
    try {
        const rows = db.prepare(
            'SELECT DISTINCT category FROM vocabulary ORDER BY category ASC'
        ).all();
        res.json(rows.map(row => row.category));
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get all difficulties
router.get('/difficulties', (req, res) => {
    try {
        const rows = db.prepare(
            'SELECT DISTINCT difficulty FROM vocabulary ORDER BY difficulty ASC'
        ).all();
        res.json(rows.map(row => row.difficulty));
    } catch (error) {
        console.error('Error fetching difficulties:', error);
        res.status(500).json({ error: 'Failed to fetch difficulties' });
    }
});

// Add a new word
router.post('/', (req, res) => {
    try {
        const { word, definition, difficulty = 'Intermediate', category = 'General' } = req.body;
        
        if (!word || !definition) {
            return res.status(400).json({ error: 'Word and definition are required' });
        }
        
        const result = db.prepare(
            'INSERT INTO vocabulary (word, definition, difficulty, category) VALUES (?, ?, ?, ?)'
        ).run(word, definition, difficulty, category);
        
        const newWord = db.prepare(
            'SELECT * FROM vocabulary WHERE id = ?'
        ).get(result.lastInsertRowid);
        
        res.status(201).json(newWord);
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Word already exists' });
        }
        console.error('Error adding word:', error);
        res.status(500).json({ error: 'Failed to add word' });
    }
});

// Update a word
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { word, definition, difficulty, category } = req.body;
        
        const result = db.prepare(
            'UPDATE vocabulary SET word = ?, definition = ?, difficulty = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).run(word, definition, difficulty, category, id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Word not found' });
        }
        
        const updatedWord = db.prepare(
            'SELECT * FROM vocabulary WHERE id = ?'
        ).get(id);
        
        res.json(updatedWord);
    } catch (error) {
        console.error('Error updating word:', error);
        res.status(500).json({ error: 'Failed to update word' });
    }
});

// Delete a word
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        const result = db.prepare('DELETE FROM vocabulary WHERE id = ?').run(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Word not found' });
        }
        
        res.json({ message: 'Word deleted successfully' });
    } catch (error) {
        console.error('Error deleting word:', error);
        res.status(500).json({ error: 'Failed to delete word' });
    }
});

export default router;
