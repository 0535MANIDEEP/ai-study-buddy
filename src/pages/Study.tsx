import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Layers, Brain, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopicInput from '../components/TopicInput';
import FlashCard from '../components/FlashCard';
import QuizQuestion from '../components/QuizQuestion';
import StatsBar from '../components/StatsBar';
import { useStudy } from '../hooks/useStudy';

function Study() {
  const [activeTab, setActiveTab] = useState<'generate' | 'study'>('generate');
  
  const {
    flashcards,
    quizQuestions,
    currentCardIndex,
    mode,
    isFlipped,
    stats,
    isLoading,
    error,
    summary,
    generateMaterials,
    flipCard,
    markGotIt,
    markReview,
    setMode,
    selectAnswer,
    nextQuestion,
    resetStudy,
    currentCard,
    currentQuestion,
    totalCards,
    totalQuestions,
    currentQuestionIndex,
  } = useStudy();

  const hasContent = flashcards.length > 0 || quizQuestions.length > 0;

  useEffect(() => {
    if (hasContent && activeTab === 'generate') {
      setActiveTab('study');
    }
  }, [hasContent, activeTab]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeTab !== 'study') return;
    
    if (mode === 'flashcard' && currentCard) {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          flipCard();
          break;
        case '1':
          markGotIt();
          break;
        case '2':
          markReview();
          break;
      }
    }
  }, [activeTab, mode, currentCard, flipCard, markGotIt, markReview]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleGenerate = async (text: string) => {
    await generateMaterials(text);
  };

  const handleNewTopic = () => {
    resetStudy();
    setActiveTab('generate');
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Study Session</h1>
          <p className="text-gray-300">
            {hasContent 
              ? 'Review your flashcards or test your knowledge with quizzes'
              : 'Generate study materials from any topic or text'}
          </p>
        </div>

        {/* Stats */}
        {hasContent && (
          <div className="mb-8">
            <StatsBar stats={stats} />
          </div>
        )}

        {/* Tabs */}
        {hasContent && (
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'generate'
                  ? 'bg-white/10 text-white'
                   : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              New Topic
            </button>
            
            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'study'
                  ? 'bg-white/10 text-white'
                   : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Brain className="w-4 h-4" />
              Study
            </button>
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              What do you want to study?
            </h2>
            <TopicInput onGenerate={handleGenerate} isLoading={isLoading} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Study Tab */}
        {activeTab === 'study' && hasContent && (
          <div className="space-y-6">
            {/* Summary */}
            {summary && (
              <div className="glass-card p-4 sm:p-6">
                <p className="text-sm text-gray-300 mb-2">Summary</p>
                <p className="text-white">{summary}</p>
              </div>
            )}

            {/* Mode Toggle */}
            <div className="flex items-center justify-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit mx-auto">
              <button
                onClick={() => setMode('flashcard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  mode === 'flashcard'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                Flashcards
              </button>
              <button
                onClick={() => setMode('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  mode === 'quiz'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Brain className="w-4 h-4" />
                Quiz
              </button>
            </div>

            {/* Progress Bar */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                <span>Progress</span>
                <span>
                  {mode === 'flashcard' 
                    ? `${currentCardIndex + 1} / ${totalCards}`
                    : `${currentQuestionIndex + 1} / ${totalQuestions}`}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{ 
                    width: `${mode === 'flashcard' 
                      ? ((currentCardIndex + 1) / totalCards) * 100
                      : ((currentQuestionIndex + 1) / totalQuestions) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Flashcard View */}
            {mode === 'flashcard' && currentCard && (
              <div className="glass-card p-6 sm:p-8">
                <FlashCard
                  card={currentCard}
                  isFlipped={isFlipped}
                  onFlip={flipCard}
                  onGotIt={markGotIt}
                  onReview={markReview}
                  currentIndex={currentCardIndex}
                  total={totalCards}
                />
              </div>
            )}

            {/* Quiz View */}
            {mode === 'quiz' && currentQuestion && (
              <QuizQuestion
                question={currentQuestion}
                onSelectAnswer={selectAnswer}
                onNext={nextQuestion}
                currentIndex={currentQuestionIndex}
                total={totalQuestions}
              />
            )}

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={handleNewTopic}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Start New Topic
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Study;
