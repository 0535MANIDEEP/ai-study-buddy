import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface TopicInputProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

function TopicInput({ onGenerate, isLoading }: TopicInputProps) {
  const [text, setText] = useState('');
  const maxLength = 10000;

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onGenerate(text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your notes, textbook content, or enter a topic..."
          className="input-field min-h-[200px] resize-none"
          maxLength={maxLength}
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {text.length} / {maxLength}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-300">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Enter</kbd> to generate
        </p>
        
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isLoading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Study Materials
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TopicInput;
