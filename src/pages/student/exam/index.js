import Layout from "@/Components/Layout/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./exam.module.css";
import ExamBlock from "@/Components/Exam/ExamBlock";
import { getAllExams } from "@/Actions/Controller";
const ExamData = () => {
  const [exams, setExams] = useState([]);
  const [alertBox, setAlertBox] = useState({});
  useEffect(() => {
    const getExams = async () => {
      const res = await getAllExams();
      if (res.success) {
        setExams(res.data);
      } else {
        setAlertBox({
          type: "danger",
          mesaage: "Not able to featch data",
        });
      }
    };
    getExams();
  }, []);
  return (
    <Layout alerts={alertBox}>
      <div>
        <div className={styles.flex}>
          <div>
            <h1>Exams</h1>
          </div>
        </div>
        <h2>Exam need to attempt :</h2>
        {exams.notAttempted ? (
          <div className={styles.grid}>
            {exams.notAttempted.map((values, index) => {
              return (
                <ExamBlock
                  key={index}
                  data={values}
                  redirect={`/student/exam/${values._id}`}
                />
              );
            })}
          </div>
        ) : (
          <h1>No Exam yet to attempt</h1>
        )}
        <br />
        <br />
        <h2>Attempted Exam :</h2>
        {exams.attempted ? (
          <div className={styles.grid}>
            {exams.attempted.map((values, index) => {
              return (
                <ExamBlock
                  key={index}
                  data={values}
                  redirect={`/student/exam/${values._id}/result`}
                />
              );
            })}
          </div>
        ) : (
          <h1>No Exam Attempted</h1>
        )}
      </div>
    </Layout>
  );
};

export default ExamData;
