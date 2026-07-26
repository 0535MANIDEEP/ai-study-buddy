# AI Study Buddy

AI-powered study tool that generates flashcards and quiz questions from any text input. Provides an interactive study experience with spaced repetition tracking and accuracy metrics.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Vercel Serverless Function |
| AI Model | Mistral-Small-3.2-24B-Instruct (via OVHcloud AI) |

## Features

- Text input for any topic or content
- AI-generated flashcards (10 per session) with flip animation
- AI-generated quiz questions (5 per session) with multiple choice
- Flashcard tracking: mark as "Got It" or "Needs Review"
- Quiz answer selection with immediate feedback and explanations
- Study statistics: cards studied, accuracy percentage, streak counter
- Two study modes: Flashcard mode and Quiz mode
- Responsive design with gradient background

## How It Works

1. User enters text or topic content on the home page
2. Frontend sends the text to the Vercel serverless function at `/api/index`
3. The function sends a structured prompt to the Mistral AI model
4. AI generates a JSON response with summary, flashcards, and quiz questions
5. User studies using flashcard or quiz mode, with progress tracked locally

## Setup

```bash
git clone https://github.com/your-username/ai-study-buddy.git
cd ai-study-buddy
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Deployed URL

[https://ai-study-buddy.vercel.app](https://ai-study-buddy.vercel.app)
