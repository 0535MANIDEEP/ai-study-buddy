import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { QuizQuestion as QuizQuestionType } from '../types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

function QuizQuestion({ 
  question, 
  onSelectAnswer, 
  onNext,
  currentIndex,
  total 
}: QuizQuestionProps) {
  const getOptionStyle = (index: number) => {
    if (!question.answered) {
      return 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-500/50 cursor-pointer';
    }
    
    if (index === question.correctIndex) {
      return 'bg-green-500/20 border-green-500/50';
    }
    
    if (index === question.selectedOption && index !== question.correctIndex) {
      return 'bg-red-500/20 border-red-500/50';
    }
    
    return 'bg-white/5 border-white/10 opacity-50';
  };

  const getOptionIcon = (index: number) => {
    if (!question.answered) return null;
    
    if (index === question.correctIndex) {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    }
    
    if (index === question.selectedOption && index !== question.correctIndex) {
      return <XCircle className="w-5 h-5 text-red-400" />;
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-300">
        <span>Question {currentIndex + 1} / {total}</span>
        <span className="text-purple-300 font-medium">Quiz Mode</span>
      </div>

      <div className="glass-card p-6">
        <p className="text-lg text-white mb-6">{question.question}</p>
        
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !question.answered && onSelectAnswer(question.id, index)}
              disabled={question.answered}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${getOptionStyle(index)}`}
            >
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-left text-white">{option}</span>
              </span>
              {getOptionIcon(index)}
            </button>
          ))}
        </div>

        {question.answered && (
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-300 mb-2">Explanation:</p>
            <p className="text-white">{question.explanation}</p>
          </div>
        )}
      </div>

      {question.answered && currentIndex < total - 1 && (
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="btn-primary flex items-center gap-2"
          >
            Next Question
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {question.answered && currentIndex === total - 1 && (
        <div className="text-center text-gray-300">
          <p>You've completed all quiz questions!</p>
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;
