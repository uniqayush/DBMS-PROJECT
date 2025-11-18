import React, { useState, useEffect } from "react";
// Using the new API-based vocabulary database
import { getRandomWord, getRandomWordByDifficulty, generateMultipleChoiceOptions } from './vocabularyDatabase.new';
// Import your new, enhanced CSS file. Let's assume you've named it App.css or similar.
import './App.css'; 

// Learning Interface Component
const LearningInterface = ({ onBackToHome }) => {
    // ... (all your existing useState and helper functions remain the same) ...
    // No changes needed for the logic part of your component.
    // We only need to update the JSX rendering to use the new CSS classes.

    const [currentWord, setCurrentWord] = useState(null);
    const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [score, setScore] = useState(0);
    const [wordsLearned, setWordsLearned] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [streak, setStreak] = useState(0);
    const [learnedWords, setLearnedWords] = useState([]);
    const [isRevisionMode, setIsRevisionMode] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showProgressChart, setShowProgressChart] = useState(false);

    // This state helps in adding a nice fade-in animation
    const [isCardVisible, setIsCardVisible] = useState(false);

    useEffect(() => {
        if (gameStarted) {
            setIsCardVisible(true);
        } else {
            setIsCardVisible(false);
        }
    }, [gameStarted]);

    const backToDifficultySelection = () => {
        setGameStarted(false);
        // Don't reset score and wordsLearned - keep them for progress tracking
        setStreak(0);
        setIsRevisionMode(false);
    };

    const startNewWord = async (difficulty) => {
        try {
            const word = difficulty === 'All'
                ? await getRandomWord(learnedWords)
                : await getRandomWordByDifficulty(difficulty, learnedWords);

            if (word) {
                setCurrentWord(word);
                const options = await generateMultipleChoiceOptions(word);
                setMultipleChoiceOptions(options);
                setShowAnswer(false);
                setSelectedOption(null);
                setShowHint(false);
            } else {
                // All words in this difficulty have been learned
                alert(`Congratulations! You've mastered all ${difficulty === 'All' ? '' : difficulty} words! 🎉`);
                backToDifficultySelection();
            }
        } catch (error) {
            console.error('Error loading word:', error);
            alert('Failed to load word. Please check if the server is running.');
        }
    };

    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setGameStarted(true);
        startNewWord(difficulty);
    };

    const startRevisionMode = () => {
        if (learnedWords.length === 0) {
            alert('Learn some words first to unlock revision mode!');
            return;
        }
        setIsRevisionMode(true);
        setGameStarted(true);
        nextRevisionWord();
    };

    const nextRevisionWord = async () => {
        if (learnedWords.length === 0) {
            backToDifficultySelection();
            return;
        };
        try {
            const randomIndex = Math.floor(Math.random() * learnedWords.length);
            const word = learnedWords[randomIndex];
            setCurrentWord(word);
            const options = await generateMultipleChoiceOptions(word);
            setMultipleChoiceOptions(options);
            setShowAnswer(false);
            setSelectedOption(null);
            setShowHint(false);
        } catch (error) {
            console.error('Error loading revision word:', error);
            alert('Failed to load word. Please check if the server is running.');
        }
    };

    const handleOptionSelect = (option) => {
        if (showAnswer) return;

        setSelectedOption(option);
        setShowAnswer(true);
        const isCorrect = option.word === currentWord.word;

        if (isCorrect) {
            setScore(score + 1);
            setStreak(streak + 1);
            if (!learnedWords.find(w => w.word === currentWord.word)) {
                setLearnedWords(prev => [...prev, currentWord]);
            }
        } else {
            setStreak(0);
        }
        setWordsLearned(wordsLearned + 1);
    };

    const nextWord = () => {
        if (isRevisionMode) {
            nextRevisionWord();
        } else {
            startNewWord(selectedDifficulty);
        }
    };

    const getHint = (word) => {
        const hints = {
            'Innovative': "This word describes something new and creative! 💡",
            'Ambitious': "Someone who really wants to succeed has this quality! 🎯",
            'Confident': "When you believe in yourself, you are... 💪",
        };
        return hints[word] || "Think about the context where you might hear this word. 🤔";
    };

    const difficultyData = {
        All: {
            description: 'Explore the full linguistic journey',
            icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            )
        },
        Beginner: {
            description: 'Build your language foundation',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
            )
        },
        Intermediate: {
            description: 'Elevate your expressive skills',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            )
        },
        Advanced: {
            description: 'Master sophisticated communication',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
            )
        }
    };


    const renderDifficultySelection = () => (
        <div className="cta-card">
            <h2 className="learning-title">Choose Your Challenge</h2>
             <div className="button-group" style={{marginBottom: '1rem', gap: '0.75rem'}}>
                 <button
                    onClick={startRevisionMode}
                    className={`btn ${learnedWords.length === 0 ? 'btn-disabled' : 'btn-primary'}`}
                    disabled={learnedWords.length === 0}
                    title={learnedWords.length === 0 ? 'Answer questions correctly to unlock review mode' : 'Review your learned words'}
                >
                    📚 Review Learned Words ({learnedWords.length})
                </button>
                <button
                    onClick={() => setShowProgressChart(true)}
                    className="btn btn-secondary"
                    title="View your learning progress and statistics"
                >
                    📊 Track Progress
                </button>
            </div>
            <div className="difficulty-grid">
                {Object.keys(difficultyData).map((difficulty) => (
                    <div
                        key={difficulty}
                        onClick={() => handleDifficultySelect(difficulty)}
                        className="difficulty-card"
                    >
                        {difficultyData[difficulty].icon}
                        <h3>{difficulty}</h3>
                        <p>{difficultyData[difficulty].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
    // This is the quiz view, it also uses new classes
    const renderQuiz = () => (
        <>
            <div className="stats-grid">
                 <div className="stat-card">
                    <h3 className="stat-number">{score}</h3>
                    <p className="stat-label">Score</p>
                </div>
                 <div className={`stat-card ${streak > 2 ? 'streak-celebration' : ''}`}>
                    <h3 className="stat-number">{streak} 🔥</h3>
                    <p className="stat-label">Streak</p>
                </div>
                 <div className="stat-card">
                    <h3 className="stat-number">{learnedWords.length}</h3>
                    <p className="stat-label">Words Learned</p>
                </div>
            </div>
    
            {currentWord && (
                <div className="learning-card">
                    <h2 className="word-definition">{currentWord.word}</h2>
                    
                    { /* The multiple choice options with color feedback */ }
                    <div className="button-group" style={{flexDirection: 'column'}}>
                        {multipleChoiceOptions.map((option, index) => {
                            let buttonClass = 'btn btn-secondary';
                            
                            if (showAnswer) {
                                // Correct answer is always green
                                if (option.word === currentWord.word) {
                                    buttonClass = 'btn btn-correct';
                                }
                                // Selected wrong answer is red
                                else if (selectedOption && option.word === selectedOption.word) {
                                    buttonClass = 'btn btn-incorrect';
                                }
                                // Other options are disabled/grayed out
                                else {
                                    buttonClass = 'btn btn-disabled';
                                }
                            }
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={buttonClass}
                                    disabled={showAnswer}
                                >
                                    {option.definition}
                                </button>
                            );
                        })}
                    </div>

                     {showAnswer && (
                        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
                            <button onClick={nextWord} className="btn btn-primary">
                                Next Word →
                            </button>
                        </div>
                    )}
                </div>
            )}
             <div style={{textAlign: 'center', marginTop: '1rem'}}>
                <button onClick={backToDifficultySelection} className="back-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
                    Back to Selection
                </button>
            </div>
        </>
    );

    const renderProgressChart = () => {
        const accuracy = wordsLearned > 0 ? Math.round((score / wordsLearned) * 100) : 0;
        
        return (
            <div className="cta-card" style={{maxWidth: '1100px'}}>
                <h2 className="learning-title">📊 Your Learning Progress</h2>
                
                <div className="stats-grid" style={{marginTop: '1.5rem', marginBottom: '1rem'}}>
                    <div className="stat-card">
                        <h3 className="stat-number" style={{color: '#10b981'}}>{score}</h3>
                        <p className="stat-label">Correct Answers</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number" style={{color: '#ef4444'}}>{wordsLearned - score}</h3>
                        <p className="stat-label">Wrong Answers</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number" style={{color: '#6366f1'}}>{wordsLearned}</h3>
                        <p className="stat-label">Total Attempts</p>
                    </div>
                </div>

                <div className="stats-grid" style={{marginBottom: '1.5rem'}}>
                    <div className="stat-card">
                        <h3 className="stat-number" style={{color: '#f59e0b'}}>{accuracy}%</h3>
                        <p className="stat-label">Accuracy</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number" style={{color: '#ec4899'}}>{learnedWords.length}</h3>
                        <p className="stat-label">Words Mastered</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number" style={{color: '#8b5cf6'}}>{streak}</h3>
                        <p className="stat-label">Current Streak</p>
                    </div>
                </div>

                <div style={{marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '1rem'}}>
                    <h3 style={{fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem'}}>
                        📚 Words You've Mastered
                    </h3>
                    {learnedWords.length > 0 ? (
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                            {learnedWords.map((word, index) => (
                                <span key={index} style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    padding: '0.4rem 0.9rem',
                                    borderRadius: '25px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    transition: 'transform 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    {word.word}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p style={{color: '#64748b', fontStyle: 'italic', fontSize: '0.9rem'}}>
                            Start learning to see your mastered words here!
                        </p>
                    )}
                </div>

                <div style={{textAlign: 'center', marginTop: '1rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                    <button onClick={() => setShowProgressChart(false)} className="btn btn-primary">
                        ← Back to Challenges
                    </button>
                    <button 
                        onClick={() => {
                            if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
                                setScore(0);
                                setWordsLearned(0);
                                setStreak(0);
                                setLearnedWords([]);
                                setShowProgressChart(false);
                            }
                        }} 
                        className="btn btn-secondary"
                        style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white', border: '2px solid #ef4444'}}
                    >
                        🔄 Reset Progress
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <header className="learning-header">
                <div className="container header-content">
                    <div className="logo">LexiLearn</div>
                    <button onClick={onBackToHome} className="back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                        </svg>
                        Home
                    </button>
                </div>
            </header>
            <main className="learning-main">
                <div className="container">
                    {showProgressChart ? renderProgressChart() : (!gameStarted ? renderDifficultySelection() : renderQuiz())}
                </div>
            </main>
        </>
    );

};

export default LearningInterface;