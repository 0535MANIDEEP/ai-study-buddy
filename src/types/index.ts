export interface FlashCard {
  id: string;
  front: string;
  back: string;
  reviewed: boolean;
  gotIt: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  answered: boolean;
  selectedOption: number | null;
}

export interface StudyMaterials {
  flashcards: { front: string; back: string }[];
  quiz: { question: string; options: string[]; correctIndex: number; explanation: string }[];
  summary: string;
}

export interface StudyStats {
  cardsStudied: number;
  accuracy: number;
  streak: number;
  totalCards: number;
}
