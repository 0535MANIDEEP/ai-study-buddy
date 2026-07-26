import { motion } from 'framer-motion';
import { RotateCcw, Check, X } from 'lucide-react';
import type { FlashCard as FlashCardType } from '../types';

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
  onGotIt: () => void;
  onReview: () => void;
  currentIndex: number;
  total: number;
}

function FlashCard({ 
  card, 
  isFlipped, 
  onFlip, 
  onGotIt, 
  onReview,
  currentIndex,
  total 
}: FlashCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-300">
        <span>Card {currentIndex + 1} / {total}</span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Space to flip</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">1 = Got it</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">2 = Review</span>
        </span>
      </div>

      <div 
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={onFlip}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div 
            className={`absolute inset-0 glass-card p-8 flex items-center justify-center ${
              isFlipped ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider text-purple-300 mb-4 block">Question</span>
              <p className="text-xl text-white leading-relaxed">{card.front}</p>
            </div>
          </div>

          {/* Back */}
          <div 
            className={`absolute inset-0 glass-card p-8 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 ${
              isFlipped ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="text-center">
              <span className="text-xs uppercase tracking-wider text-pink-300 mb-4 block">Answer</span>
              <p className="text-xl text-white leading-relaxed">{card.back}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFlip();
          }}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Flip
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGotIt();
          }}
          className="flex items-center gap-2 px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all duration-200 border border-green-500/30"
        >
          <Check className="w-4 h-4" />
          Got it
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReview();
          }}
          className="flex items-center gap-2 px-6 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-all duration-200 border border-orange-500/30"
        >
          <X className="w-4 h-4" />
          Need Review
        </button>
      </div>
    </div>
  );
}

export default FlashCard;
