import { getExamData, submitExam } from "@/Actions/Controller";
import Layout from "@/Components/Layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./attempt.module.css";
import { redirect } from "next/dist/server/api-utils";
const Index = (props) => {
  const { examId } = props.query;
  const router = useRouter();
  const [switchCount, setSwitchCount] = useState(0);
  const [alertBox, setAlertBox] = useState({});
  const maxAllowedSwitches = 3;
  const [examData, setExamData] = useState({});
  const [timer, setTimer] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(Date());
  useEffect(() => {
    if (!examId) return router.prefetch("/");

    const getData = async () => {
      const res = await getExamData(examId);
      if (!res.success) {
        setAlertBox({
          type: "warning",
          message: res.message,
          redirect: "/student/exam",
        });
        return;
      }
      setExamData(res.data);
      setTimer(res.data.timelimit * 60);
      console.log(res.data);
    };
    getData();
  }, [examId, router]);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    const handleCopy = (event) => {
      event.preventDefault();
    };
    const handleSelectStart = (event) => {
      event.preventDefault();
    };
    const handleResize = () => {
      setAlertBox({
        type: "warning",
        message: `Don't resize the window.`,
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSwitchCount((prevSwitchCount) => {
          const newCount = prevSwitchCount + 1;

          setAlertBox({
            type: "warning",
            message: `Don't switch tabs. You have only ${
              maxAllowedSwitches - newCount
            } chances remaining.`,
          });

          if (newCount >= maxAllowedSwitches) {
            setAlertBox({
              type: "danger",
              message: `You have been disqualified for switching tabs too many times.`,
            });
          }
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("resize", handleResize);
    };
  }, [maxAllowedSwitches]);

  useEffect(() => {
    const updateTimer = () => {
      if (timer <= 0) {
        console.log("Time's up!");
        clearInterval(timerInterval);
        return;
      }
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      setFormattedTime(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`
      );
      setTimer((prevTimer) => prevTimer - 1);
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const submitExamToServer = async () => {
    const data = {
      examId,
      startTime,
      endTime: new Date(),
      answers,
      switchCount,
      status: switchCount >= maxAllowedSwitches ? "disqualified" : "completed",
    };

    const res = await submitExam(data);
    if (res.success) {
      setAlertBox({
        type: "success",
        message: "Exam Submitted successfully",
        redirect: "/student/exam",
      });
    }
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = {
      ...answers,
      [examData.questions[currentQuestionIndex]._id]: e.target.value,
    };
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitExamToServer();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handelChnageQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <Layout isExamStarted={true} title={"exam"} alerts={alertBox}>
      <p className={styles.timer}>Timer: {formattedTime}</p>

      <div>
        {examData.questions && examData.questions.length > 0 ? (
          <div>
            <label className={styles.title}>
              Question :
              <br />
              <h2>{examData.questions[currentQuestionIndex].question}</h2>
            </label>
            {examData.questions[currentQuestionIndex].type ===
            "multiple-choice" ? (
              <div className={styles.answerDiv}>
                {examData.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div key={index} className={styles.options}>
                      <input
                        type="radio"
                        name={`question_${currentQuestionIndex}`}
                        value={option}
                        onChange={handleAnswerChange}
                        checked={
                          answers[
                            examData.questions[currentQuestionIndex]._id
                          ] === option
                        }
                      />
                      {option}
                    </div>
                  )
                )}
              </div>
            ) : (
              <input
                className={styles.textIn}
                type="text"
                name={`question_${currentQuestionIndex}`}
                value={
                  answers[examData.questions[currentQuestionIndex]._id] || ""
                }
                onChange={handleAnswerChange}
              />
            )}

            <div className={styles.examQuestionBlock}>
              {examData.questions.map((value, index) => {
                return (
                  <div
                    className={`${styles.questionBlock} ${
                      value._id in answers ? styles.success : styles.remaning
                    }`}
                    onClick={() => handelChnageQuestion(index)}
                  >
                    {index}
                  </div>
                );
              })}
            </div>
            <div>
              Attempted
              <span className={`${styles.questionBlock} ${styles.success}`}>
                {Object.keys(answers).length}
              </span>
            </div>
            <br />
            <div>
              Not attempted
              <span className={`${styles.questionBlock} ${styles.remaning}`}>
                {examData.questions.length - Object.keys(answers).length}
              </span>
            </div>

            <div className={styles.flex}>
              {currentQuestionIndex > 0 && (
                <button
                  className={`${styles.btn} ${styles.back}`}
                  onClick={handlePreviousQuestion}
                >
                  Back
                </button>
              )}

              <button
                className={`${styles.btn} ${styles.submit}`}
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < examData.questions.length - 1
                  ? "Next"
                  : "Submit"}
              </button>
            </div>
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      query: context.params,
    },
  };
};

export default Index;
