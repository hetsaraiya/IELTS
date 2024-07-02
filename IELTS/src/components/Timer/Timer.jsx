import React, { useState, useEffect } from 'react';

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (!formSubmitted) {
      intervalId = setInterval(() => {
        if (seconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
          setSeconds(0);
        } else {
          setSeconds(prevSeconds => prevSeconds + 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [formSubmitted, seconds]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    // Add code here to handle form submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Timer: {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Timer;
