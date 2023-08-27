import React, { useEffect, useState } from 'react';

export default function Trivia({
  data,
  setStop,
  questionNo,
  setQuestionNo,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAns, setSelectedAns] = useState(null);
  const [className, setClassName] = useState('active');

  useEffect(() => {
    if (data && data[questionNo - 1]) {
      setQuestion(data[questionNo - 1]);
    }
  }, [data, questionNo]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAns(a);
    setClassName('answer active');
    delay(3000, () => {
      setClassName(a.correct ? 'answer correct' : 'answer wrong');
    });
    delay(6000, () => {
      if(a.correct){
        setQuestionNo((prev)=>prev+1);
        setSelectedAns(null);
      }
      else{
        setStop(true);
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAns === a ? className : 'answer'}
            onClick={() => !selectedAns && handleClick(a)}
            key={a.text} // Add a unique key to each answer element
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
