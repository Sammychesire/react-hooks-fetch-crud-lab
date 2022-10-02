import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setQuestions(data);
      });
  }, []);

  function handleNewQuestion(newQuestion) {
    setQuestions((questions) => [...questions, newQuestion]);
  }
  function onDeleteItem(id) {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  }
  function onAnswerChange(question) {
    const updatedQuestions = questions.map((q) => {
      return q.id === question.id ? question : q;
    });
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleNewQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={onDeleteItem} onAnswerChange={onAnswerChange} />
      )}
    </main>
  );
}

export default App;
