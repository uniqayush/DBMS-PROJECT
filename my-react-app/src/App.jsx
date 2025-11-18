import React, { useState } from 'react';
import './App.css';
import LearningInterface from './LearningInterface';

// Header component with navigation
const Header = ({ onLearnClick }) => (
    <header className="header">
        <div className="container header-content">
            <div className="logo">LexiLearn</div>
            <nav className="nav">
                <a href="#home" className="nav-link">
                    Home
                </a>
                <a href="#features" className="nav-link">
                    Features
                </a>
                <a href="#learn" className="nav-link" onClick={(e) => { e.preventDefault(); onLearnClick(); }}>
                    Learn
                </a>
                <a href="#about" className="nav-link">
                    About
                </a>
            </nav>
        </div>
    </header>
);

// Hero section with a strong call to action
const HeroSection = ({ onStartLearning }) => (
    <section className="hero">
        <h1 className="hero-title">
            Master the Words <br />That Matter
        </h1>
        <p className="hero-subtitle">
            LexiLearn is your personal vocabulary companion. Learn new words, track your progress, and get smart suggestions tailored to your learning style.
        </p>
        <div className="hero-buttons">
            <button 
                onClick={onStartLearning}
                className="btn btn-primary"
            >
                Start Learning for Free
            </button>
            <button className="btn btn-secondary">
                Learn More
            </button>
        </div>
    </section>
);

// Features section to showcase the app's benefits
const FeaturesSection = () => (
    <section id="features" className="features">
        <div className="container">
            <h2 className="features-title">How LexiLearn Works</h2>
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="3" x2="9" y2="21"></line>
                        </svg>
                    </div>
                    <h3 className="feature-title">Personalized Tracking</h3>
                    <p className="feature-description">Keep a detailed record of every word you've learned and your progress towards mastery.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12l4 4z"></path>
                            <path d="M12 12h6"></path>
                            <path d="M12 16h6"></path>
                        </svg>
                    </div>
                    <h3 className="feature-title">Smart Suggestions</h3>
                    <p className="feature-description">Our intelligent system suggests words that are relevant to your interests and learning level.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <h3 className="feature-title">Interactive Quizzes</h3>
                    <p className="feature-description">Test your knowledge with fun, interactive quizzes to cement your vocabulary in memory.</p>
                </div>
            </div>
        </div>
    </section>
);

// Call to Action section
const CTASection = ({ onStartLearning }) => (
    <section id="learn" className="cta">
        <div className="container">
            <div className="cta-card">
                <h2 className="cta-title">Ready to Transform Your Vocabulary?</h2>
                <p className="cta-description">
                    Join thousands of learners who are already expanding their knowledge with LexiLearn. It's free, intuitive, and designed to help you succeed.
                </p>
                <button 
                    onClick={onStartLearning}
                    className="btn btn-primary"
                >
                    Get Started Now
                </button>
            </div>
        </div>
    </section>
);

// Footer component
const Footer = () => (
    <footer className="footer">
        <div className="container">
            <p>&copy; {new Date().getFullYear()} LexiLearn. All rights reserved.</p>
            <div className="footer-links">
                <a href="#" className="footer-link">Privacy Policy</a>
                <span className="footer-separator">|</span>
                <a href="#" className="footer-link">Terms of Service</a>
            </div>
        </div>
    </footer>
);

// Main App component that renders the entire landing page
const App = () => {
    const [currentView, setCurrentView] = useState('landing');

    const navigateToLearning = () => {
        setCurrentView('learning');
    };

    const navigateToLanding = () => {
        setCurrentView('landing');
    };

    if (currentView === 'learning') {
        return (
            <div style={{minHeight: '100vh', background: '#f8fafc'}}>
                <LearningInterface onBackToHome={navigateToLanding} />
            </div>
        );
    }

    return (
        <div style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', minHeight: '100vh', color: '#f1f5f9'}}>
            <Header onLearnClick={navigateToLearning} />
            <main>
                <HeroSection onStartLearning={navigateToLearning} />
                <FeaturesSection />
                <CTASection onStartLearning={navigateToLearning} />
            </main>
            <Footer />
        </div>
    );
};

export default App;