import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NavBar from './components/navbar';
import HighlightedCars from './components/highlightedCars';

function NavigationButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' && (
        <button onClick={() => navigate('/highlighted')}>Go to Highlighted Cars</button>
      )}
      {location.pathname === '/highlighted' && (
        <button onClick={() => navigate('/')}>Go to Dashboard</button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <NavigationButtons />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/highlighted" element={<HighlightedCars />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
