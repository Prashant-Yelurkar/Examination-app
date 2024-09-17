import React, { useState } from "react";

const CreateExam = () => {
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: "text", question: "", options: [], answer: "" },
    ]);
  };

  const handleQuestionTypeChange = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send questions data to backend API
    const res = await fetch("/api/saveExam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questions }),
    });

    if (res.ok) {
      alert("Exam saved successfully");
    } else {
      alert("Failed to save exam");
    }
  };

  return (
    <div>
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <label>
              Question {index + 1}:
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder="Enter your question"
              />
            </label>

            <label>
              Question Type:
              <select
                value={q.type}
                onChange={(e) =>
                  handleQuestionTypeChange(index, e.target.value)
                }
              >
                <option value="text">Text</option>
                <option value="multiple-choice">Multiple Choice</option>
              </select>
            </label>

            {q.type === "multiple-choice" && (
              <div>
                {q.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                ))}
                <button type="button" onClick={() => handleAddOption(index)}>
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Save Exam</button>
      </form>
    </div>
  );
};

export default CreateExam;
