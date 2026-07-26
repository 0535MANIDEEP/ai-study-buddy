import { Link } from 'react-router-dom';
import { Sparkles, Brain, BarChart3, ArrowRight, BookOpen, Zap, Target } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: Sparkles,
      title: 'Auto-Generate Flashcards',
      description: 'Paste any text or topic and instantly get beautifully crafted flashcards with questions and answers.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Brain,
      title: 'Smart Quizzes',
      description: 'Test your understanding with AI-generated multiple choice questions that challenge your knowledge.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your study stats including cards reviewed, accuracy rate, and learning streaks.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const statsPreview = [
    { label: 'Cards Studied', value: '24', icon: BookOpen },
    { label: 'Accuracy', value: '87%', icon: Target },
    { label: 'Streak', value: '5', icon: Zap },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Powered by Free AI</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">AI </span>
            <span className="gradient-text">Study Buddy</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Turn any text into flashcards and quizzes instantly. 
            Study smarter, not harder.
          </p>

          <Link
            to="/study"
            className="inline-flex items-center gap-2 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            Start Studying
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6">
            <div className="grid grid-cols-3 gap-6">
              {statsPreview.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Everything you need to study effectively
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            How it works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Paste your content', desc: 'Enter notes, textbook content, or any topic' },
              { step: '2', title: 'AI generates materials', desc: 'Get flashcards and quizzes instantly' },
              { step: '3', title: 'Study and track progress', desc: 'Review cards, take quizzes, and monitor your learning' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>Built with React, Vite, and Free AI</p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
