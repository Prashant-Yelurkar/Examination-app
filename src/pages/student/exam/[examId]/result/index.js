import { getExamResult } from "@/Actions/Controller";
import Layout from "@/Components/Layout/Layout";
import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";

const ExamResult = (props) => {
  const { examId } = props.query;
  const [alertBox, setAlertBox] = useState({});
  const [result, setResult] = useState({});
  useEffect(() => {
    const getResult = async () => {
      const res = await getExamResult(examId);
      if (res.success) {
        console.log(res.data);

        setResult(res.data);
      } else {
        setAlertBox({
          type: "danger",
          messge: res.meaage,
          redirect: "student/exam",
        });
      }
    };
    getResult();
  }, []);
  return (
    <Layout>
      <div>
        <h1>Exam Result : </h1>
        <br />
        <p> Start Time : {result.startTime}</p>
        <p> End Time : {result.endTime}</p>
        <p>switch count: {result.switchCount}</p>
        <p>Score: {result.score}</p>
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
export default ExamResult;
