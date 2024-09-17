import React, { useEffect, useState } from "react";
import styles from "./exam.module.css";
import { useRouter } from "next/router";

const ExamBlock = (props) => {
  const router = useRouter();
  const { data, redirect } = props;
  const [examData, setExamData] = useState({});
  useEffect(() => {
    setExamData(data);
  }, [props]);

  const handelExam = () => {
    if (redirect) router.push(redirect);
  };

  return (
    <div className={styles.block} onClick={handelExam}>
      <div>{examData.name}</div>
    </div>
  );
};

export default ExamBlock;
