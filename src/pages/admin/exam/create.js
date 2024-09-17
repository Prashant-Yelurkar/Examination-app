import Layout from "@/Components/Layout/Layout";
import React, { useState } from "react";
import styles from "./create.module.css";
import { addExam } from "@/Actions/Controller";
const CreateExam = () => {
  const [questions, setQuestions] = useState([]);
  const [examname, setExamName] = useState("");
  const [examTime, setExamTime] = useState("");
  const [alertBox, setAlertBox] = useState({});
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: "text", question: "", options: [], answer: "" },
    ]);
  };

  const handleQuestionTypeChange = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    updatedQuestions[index].options = type === "multiple-choice" ? [""] : [];
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

  const handleDeleteOption = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const validateQuestions = () => {
    for (const q of questions) {
      if (!examname) return false;
      if (!q.question || !q.answer) return false;
      if (q.type === "multiple-choice" && q.options.some((opt) => !opt)) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateQuestions()) {
      setAlertBox({ type: "warning", message: "Please fill all details" });
      return;
    }
    const res = await addExam({
      question: questions,
      name: examname,
      time: examTime,
    });

    if (res.success) {
      setAlertBox({
        type: "success",
        message: res.message,
        redirect: "/admin/exam",
      });
    }
  };

  return (
    <Layout title={"Create Exam"} alerts={alertBox}>
      <div>
        <div className={styles.js_btn}>
          <h2>Create Exam</h2>
          <button
            type="button"
            onClick={handleAddQuestion}
            className={`${styles.btn} ${styles.add_option}`}
          >
            Add Question
          </button>
        </div>
        <label>
          Exam Name :
          <input
            className={styles.inputBlock}
            type="text"
            value={examname}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="Exam Name"
          />
        </label>
        <label>
          Exam Time in min:
          <input
            className={styles.inputBlock}
            type="number"
            value={examTime}
            min={1}
            onChange={(e) => setExamTime(e.target.value)}
            placeholder="add Exam time in min (e.g 10)"
          />
        </label>
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className={styles.questionBlock}>
              <label className={styles.label}>
                Question {index + 1}:
                <input
                  className={styles.inputBlock}
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder="Enter your question"
                />
              </label>

              <label>
                Question Type:
                <br />
                <select
                  className={styles.select}
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
                <div className={styles.options}>
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className={styles.optionBloclk}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e.target.value)
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteOption(index, optionIndex)}
                        className={`${styles.btn} ${styles.dlt_btn_option}`}
                      >
                        Delete Option
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddOption(index)}
                    className={`${styles.btn} ${styles.add_option}`}
                  >
                    Add Option
                  </button>
                </div>
              )}

              <label className={styles.optionAnswer}>
                Answer:
                <br />
                {q.type === "multiple-choice" ? (
                  <select
                    className={styles.select}
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  >
                    <option value="">Select correct option</option>
                    {q.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={styles.inputBlock}
                    type="text"
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder="Enter the correct answer"
                  />
                )}
              </label>

              <div className={styles.flex}>
                <button
                  className={`${styles.btn} ${styles.dlt_btn}`}
                  type="button"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete Question
                </button>
              </div>
            </div>
          ))}

          {questions.length > 0 && (
            <div className={styles.flex}>
              <button
                className={`${styles.btn} ${styles.save_btn} `}
                type="submit"
              >
                Save Exam
              </button>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default CreateExam;
