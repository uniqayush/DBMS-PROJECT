import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import vocabularyRoutes from './routes/vocabulary.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/vocabulary', vocabularyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'LexiLearn API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to LexiLearn API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            vocabulary: '/api/vocabulary'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        
        if (!dbConnected) {
            console.error('⚠️  Warning: Database connection failed. Please check your configuration.');
            console.error('Make sure to run "npm run init-db" to initialize the database');
            process.exit(1);
        }
        
        app.listen(PORT, () => {
            console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
            console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
            console.log(`\nPress Ctrl+C to stop the server\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
