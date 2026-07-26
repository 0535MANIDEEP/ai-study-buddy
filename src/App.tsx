import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Study from './pages/Study';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<Study />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
