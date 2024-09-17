import Layout from "@/Components/Layout/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./exam.module.css";
import ExamBlock from "@/Components/Exam/ExamBlock";
import { getAllExams } from "@/Actions/Controller";
const index = () => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      const res = await getAllExams();

      if (res.success) {
        setExams(res.data);
      }
    };
    getExams();
  }, []);
  return (
    <Layout>
      <div>
        <div className={styles.flex}>
          <div>
            <h1>Exam</h1>
          </div>
          <Link href={"exam/create"} className={styles.btn}>
            Create Exam
          </Link>
        </div>
        <div className={styles.grid}>
          {exams.map((values, index) => {
            return (
              <ExamBlock
                key={index}
                data={values}
                redirect={`/admin/exam/${values._id}`}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default index;
