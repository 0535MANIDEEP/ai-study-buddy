import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, GraduationCap } from 'lucide-react';

function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Study Buddy</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/study"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === '/study'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Study</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
