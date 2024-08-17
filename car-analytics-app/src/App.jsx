import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './components/highlightedCars';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/highlighted" element={<HighlightedCars />} />
      </Routes>
    </Router>
  );
}

export default App;