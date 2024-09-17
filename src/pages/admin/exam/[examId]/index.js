import { getExamData } from "@/Actions/Controller";
import Layout from "@/Components/Layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "./exam.module.css";
const ExamDetails = (props) => {
  const [examId, setExamId] = useState(props.query.examId || "");
  const [examDetails, setExamDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!examId) return;

    const getData = async () => {
      try {
        const res = await getExamData(examId);
        if (res.success) {
          setExamDetails(res.data);
        } else {
          setError(res.message || "Failed to fetch exam details");
        }
      } catch (err) {
        setError("An error occurred while fetching exam details");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [examId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div>
        <h1>Exam Details</h1>
        <br />
        <h3>Name: {examDetails.name}</h3>
        <br />
        <p>Time Limit: {examDetails.timelimit} min</p>
        <div>
          <h3>Questions:</h3>
          <div>
            {examDetails.questions && examDetails.questions.length > 0 ? (
              examDetails.questions.map((value, index) => (
                <div key={index} className={styles.q_block}>
                  <h4>Question : {index + 1}:</h4>
                  <p className={styles.question}>{value.question}</p>
                  {value.type === "multiple-choice" && (
                    <>
                      <p>Options :</p>
                      <ul className={styles.op}>
                        {value.options.map((option, optionIndex) => (
                          <li key={optionIndex}>{option}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className={styles.answer}>
                    <strong>Answer : </strong>
                    {value.answer}
                  </p>
                </div>
              ))
            ) : (
              <p>No questions available</p>
            )}
          </div>
        </div>
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

export default ExamDetails;
