import { useState } from "react";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [next, setNext] = useState(false);
  // 正誤画面↑
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswer = {
      question: shindanData[currentQuestion].question,
      answer: answer,
      correct: answer === shindanData[currentQuestion].correct,
    };
    console.log(newAnswer);

    //正解時
    if (newAnswer.correct) {
      // setScore(score + 1); ↓
      setScore((prevScore) => prevScore + 1);
      setFeedback("〇");
    } else {
      // 不正解
      setFeedback("×");
    }

    setAnswers([...answers, newAnswer]);
    setNext(true);
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    // 次の問題があるとき
    if (nextQuestion + 1 < shindanData.length) {
      // setCurrentQuestion(currentQuestion + 1)
      setCurrentQuestion(nextQuestion);
    } else {
      // 次の問題がないとき
      setShowScore(true);
    }
    setNext(false);
  };

  return (
    <div className="shindan-container">
      {showScore ? (
        <div className="score-section">
          <h2>診断結果</h2>
          <h3>
            {score}/{shindanData.length}
          </h3>
          <table className="answer-table">
            <thead>
              <tr>質問</tr>
              <td>あなたの回答</td>
            </thead>
            <tbody>
              {answers.map((item) => (
                <tr>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td>{item.correct ? "〇" : "×"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="question-section">
          <h2>
            質問 {currentQuestion + 1}/{shindanData.length}
          </h2>
          <h2>{shindanData[currentQuestion].question}</h2>

          {next ? (
            <div className="feedvack-section">
              <h3>{feedback}</h3>
              <p>{shindanData[currentQuestion].correct}</p>
              <button onClick={goToNextQuestion}>次の質問へ</button>
            </div>
          ) : (
            <div className="answer-section">
              {shindanData[currentQuestion].options.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(item)}
                  className={`quiz-option-button option-${index}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const shindanData = [
  {
    question: "休日はどう過ごす？",
    options: ["友だちとおでかけ", "一人でのんびり", "じっくり勉強"],
    correct: "一人でのんびり",
  },
  {
    question: "あなたの寝床は？",
    options: ["ふかふかクッション", "ふわふわの芝生", "飼い主さんのおひざ"],
    correct: "ふわふわの芝生",
  },
  {
    question: "本日のディナーは？",
    options: ["リッチなキャットフード", "チュール", "ねこまんま"],
    correct: "チュール",
  },
  {
    question: "あなたのお耳は？",
    options: ["ピンと立ってる", "少し垂れてる", "ワイルドに割れてる"],
    correct: "少し垂れてる",
  },
];

export default App;
