import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json)
    .then(() => onDelete(id));
  }

  function changeCorrectAnswer(e){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => onAnswerChange(updatedQuestion));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeCorrectAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
