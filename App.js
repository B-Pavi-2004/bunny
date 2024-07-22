import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import './App.css'; // We'll create this file for global styling

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;