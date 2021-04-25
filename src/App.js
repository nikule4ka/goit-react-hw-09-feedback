import React, { useState } from 'react';
import './App.css';
import Section from './components/Section';
import Statistics from './components/Statistics';
import FeedbackOptions from './components/FeedbackOptions';
import Notification from './components/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = e => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        return;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        return;
      case 'bad':
        setBad(prevState => prevState + 1);
        return;

      default:
        return alert(`Hey, something wrong`);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return good ? Math.round((good * 100) / countTotalFeedback()) : 0;
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage();

  return (
    <div className="App">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{ good, bad, neutral }}
          onLeaveFeedback={handleIncrement}
        />
      </Section>

      <Section title="Statistic">
        {totalFeedback === 0 ? (
          <Notification message="No feedback given" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            totalFeedback={totalFeedback}
            positiveFeedback={positiveFeedback}
          />
        )}
      </Section>
    </div>
  );
}
