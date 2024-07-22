import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';

const questions = [
  { id: 1, text: "How often do you feel down or depressed?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 2, text: "How would you rate your stress level?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 3, text: "How often do you have trouble falling or staying asleep?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 4, text: "How often do you feel overwhelmed by your responsibilities?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 5, text: "How often do you feel anxious or worried?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 6, text: "How often do you have difficulty concentrating?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 7, text: "How often do you feel irritable or angry?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 8, text: "How often do you feel lonely or isolated?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 9, text: "How often do you have negative thoughts about yourself?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: 10, text: "How often do you feel physically exhausted without a clear reason?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
];

function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      navigate('/results', { state: { answers } });
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  return (
    <div className="questionnaire">
      <h1>Mental Health Assessment</h1>
      {questions.map((question) => (
        <div key={question.id} className="question">
          <p>{question.text}</p>
          <div className="options">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(question.id, option)}
                className={answers[question.id] === option ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="submit-btn">Submit</button>
    </div>
  );
}

export default Questionnaire;