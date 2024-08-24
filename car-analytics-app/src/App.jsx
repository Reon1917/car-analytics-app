import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NavBar from './components/navbar';
import HighlightedCars from './components/highlightedCars';

function App() {
  return (
    <Router basename="/car-analytics-app">
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/highlighted" element={<HighlightedCars />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;