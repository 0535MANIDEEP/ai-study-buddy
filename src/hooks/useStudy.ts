import { useState, useCallback } from 'react';
import type { FlashCard, QuizQuestion, StudyStats } from '../types';

interface UseStudyReturn {
  flashcards: FlashCard[];
  quizQuestions: QuizQuestion[];
  currentCardIndex: number;
  mode: 'flashcard' | 'quiz';
  stats: StudyStats;
  isLoading: boolean;
  error: string | null;
  summary: string;
  generateMaterials: (text: string) => Promise<void>;
  flipCard: () => void;
  markGotIt: () => void;
  markReview: () => void;
  nextCard: () => void;
  setMode: (mode: 'flashcard' | 'quiz') => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  nextQuestion: () => void;
  resetStudy: () => void;
  currentCard: FlashCard | null;
  currentQuestion: QuizQuestion | null;
  totalCards: number;
  totalQuestions: number;
  currentQuestionIndex: number;
}

export function useStudy(): UseStudyReturn {
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mode, setMode] = useState<'flashcard' | 'quiz'>('flashcard');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState('');
  const [stats, setStats] = useState<StudyStats>({
    cardsStudied: 0,
    accuracy: 100,
    streak: 0,
    totalCards: 0,
  });

  const generateMaterials = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate materials');
      }

      const materials = await response.json();
      
      const newFlashcards: FlashCard[] = materials.flashcards.map((card: { front: string; back: string }, index: number) => ({
        id: `card-${index}`,
        front: card.front,
        back: card.back,
        reviewed: false,
        gotIt: false,
      }));

      const newQuizQuestions: QuizQuestion[] = materials.quiz.map((q: { question: string; options: string[]; correctIndex: number; explanation: string }, index: number) => ({
        id: `quiz-${index}`,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        answered: false,
        selectedOption: null,
      }));

      setFlashcards(newFlashcards);
      setQuizQuestions(newQuizQuestions);
      setSummary(materials.summary || '');
      setCurrentCardIndex(0);
      setCurrentQuestionIndex(0);
      setIsFlipped(false);
      setStats({
        cardsStudied: 0,
        accuracy: 100,
        streak: 0,
        totalCards: newFlashcards.length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const flipCard = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const markGotIt = useCallback(() => {
    setFlashcards(prev => {
      const updated = [...prev];
      updated[currentCardIndex] = {
        ...updated[currentCardIndex],
        reviewed: true,
        gotIt: true,
      };
      return updated;
    });
    
    setStats(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      streak: prev.streak + 1,
    }));
    
    setIsFlipped(false);
    
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  }, [currentCardIndex, flashcards.length]);

  const markReview = useCallback(() => {
    setFlashcards(prev => {
      const updated = [...prev];
      updated[currentCardIndex] = {
        ...updated[currentCardIndex],
        reviewed: true,
        gotIt: false,
      };
      return updated;
    });
    
    setStats(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      streak: 0,
    }));
    
    setIsFlipped(false);
    
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  }, [currentCardIndex, flashcards.length]);

  const nextCard = useCallback(() => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentCardIndex, flashcards.length]);

  const selectAnswer = useCallback((questionId: string, optionIndex: number) => {
    setQuizQuestions(prev => {
      const updated = prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answered: true,
            selectedOption: optionIndex,
          };
        }
        return q;
      });
      return updated;
    });

    const question = quizQuestions.find(q => q.id === questionId);
    if (question) {
      const isCorrect = optionIndex === question.correctIndex;
      setStats(prev => ({
        ...prev,
        accuracy: Math.round(
          ((prev.accuracy * prev.cardsStudied) + (isCorrect ? 100 : 0)) / 
          (prev.cardsStudied + 1)
        ),
        cardsStudied: prev.cardsStudied + 1,
      }));
    }
  }, [quizQuestions]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, quizQuestions.length]);

  const resetStudy = useCallback(() => {
    setFlashcards([]);
    setQuizQuestions([]);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setMode('flashcard');
    setIsFlipped(false);
    setSummary('');
    setStats({
      cardsStudied: 0,
      accuracy: 100,
      streak: 0,
      totalCards: 0,
    });
  }, []);

  return {
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
    nextCard,
    setMode,
    selectAnswer,
    nextQuestion,
    resetStudy,
    currentCard: flashcards[currentCardIndex] || null,
    currentQuestion: quizQuestions[currentQuestionIndex] || null,
    totalCards: flashcards.length,
    totalQuestions: quizQuestions.length,
    currentQuestionIndex,
  };
}
