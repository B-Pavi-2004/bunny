import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Results.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Results() {
  const location = useLocation();
  const answers = location.state?.answers || {};

  const calculateScore = () => {
    const scoreMap = { "Never": 0, "Rarely": 1, "Sometimes": 2, "Often": 3, "Always": 4 };
    const totalQuestions = Object.keys(answers).length;
    const totalScore = Object.values(answers).reduce((total, answer) => total + (scoreMap[answer] || 0), 0);
    return (totalScore / (totalQuestions * 4)) * 100;
  };

  const score = calculateScore();

  const data = {
    labels: ['Your Score'],
    datasets: [{
      label: 'Score',
      data: [score],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Your Mental Health Score',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#333',
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 18
        },
        bodyFont: {
          size: 16
        },
        callbacks: {
          label: function(context) {
            return `Score: ${context.parsed.y.toFixed(2)}%`;
          }
        }
      },
      title: {
        display: true,
        text: 'Mental Health Assessment Result',
        color: '#333',
        font: {
          size: 20,
          weight: 'bold'
        }
      }
    }
  };

  const getInterpretation = (score) => {
    if (score < 25) return "Your responses suggest low levels of distress. Continue maintaining good mental health practices.";
    if (score < 50) return "Your responses indicate mild levels of distress. Consider incorporating stress-reduction techniques into your routine.";
    if (score < 75) return "Your responses suggest moderate levels of distress. It may be beneficial to talk to a trusted friend, family member, or consider professional support.";
    return "Your responses indicate high levels of distress. We strongly recommend speaking with a mental health professional for support and guidance.";
  };

  return (
    <div className="results">
      <h1>Your Results</h1>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      <p className="score">Your mental health score: {score.toFixed(2)}%</p>
      <p className="interpretation">{getInterpretation(score)}</p>
      <p className="disclaimer"><strong>Remember:</strong> This is not a diagnostic tool. Please consult with a healthcare provider for proper evaluation and support.</p>
    </div>
  );
}

export default Results;