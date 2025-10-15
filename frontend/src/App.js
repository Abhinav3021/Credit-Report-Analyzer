import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import the header
import HomePage from './pages/HomePage';
import ReportDetailPage from './pages/ReportDetailPage';

function App() {
  return (
    <Router>
      {/* The main container for the app */}
      <div className="min-h-screen bg-slate-100 font-sans">
        <Header />
        <main>
          {/* Routes will be rendered within the main tag */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report/:id" element={<ReportDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;