import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Mental Health Assessment</h1>
      <p>Take a quick assessment to get insights about your mental health.</p>
      <Link to="/questionnaire" className="start-btn">
        Start Assessment
      </Link>
    </div>
  );
}

export default Home;