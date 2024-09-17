import { getExamData } from "@/Actions/Controller";
import Layout from "@/Components/Layout/Layout";
import React, { useEffect, useState } from "react";
import styles from "./exam.module.css";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

const ExamData = (props) => {
  const { examId } = props.query;
  const router = useRouter();
  const [examData, setExamData] = useState({});
  const [alertBox, setAlertBox] = useState({});
  useEffect(() => {
    const getData = async () => {
      const res = await getExamData(examId);
      if (res.success) {
        setExamData(res.data);
      } else {
        setAlertBox({
          type: "info",
          message: res.message,
          redirect: "/student/exam",
        });
      }
    };
    try {
      getData();
    } catch (error) {
      console.log("erroe");
    }
  }, []);

  return (
    <Layout alerts={alertBox} title={"Exam Data"}>
      {examData.name ? (
        <div>
          <h1>{examData.name}</h1>
          <p>Time Limit : {examData.timelimit} min</p>
          <div className={styles.exam_instructions}>
            <h2>Instructions: During the Exam</h2>
            <ul>
              <li>
                <strong>Time Management:</strong> Keep track of the timer
                displayed on the exam screen. Allocate time wisely for each
                section.
              </li>
              <li>
                <strong>Read Questions Carefully:</strong> Ensure you read each
                question fully before selecting an answer or writing your
                response.
              </li>
              <li>
                <strong>Check Internet Connection:</strong> Ensure your internet
                connection is stable. Avoid refreshing the page or navigating
                away from the exam screen.
              </li>
              <li>
                <strong>Answer Submission:</strong> For multiple-choice
                questions, make sure to select an answer. For written responses,
                ensure your answer is well-structured and complete.
              </li>
              <li>
                <strong>Do Not Leave the Exam Page:</strong> Switching to other
                tabs or applications may result in disqualification. Stay
                focused on the exam interface.
              </li>
              <li>
                <strong>Use Scratch Paper (If Allowed):</strong> If permitted,
                use physical scratch paper for calculations or rough work.
                Remember to refer to your scratch paper sparingly and focus on
                the screen.
              </li>
              <li>
                <strong>Stay Calm:</strong> If you encounter a difficult
                question, move on and return to it later. Don’t panic; focus on
                what you know first.
              </li>
            </ul>
          </div>
          <div className={styles.exam_instructions}>
            <h2>Instructions: After the Exam</h2>
            <ul>
              <li>
                <strong>Submit Your Exam:</strong> Ensure you click the 'Submit'
                button once you have completed all questions. Confirm the
                submission.
              </li>
              <li>
                <strong>Wait for Submission Confirmation:</strong> After
                submission, wait for a confirmation message on the screen. If
                not received, contact the exam administrator.
              </li>
              <li>
                <strong>Do Not Close the Browser Immediately:</strong> After
                submitting the exam, wait until you see the submission
                confirmation or any next steps. Closing the browser prematurely
                might result in an incomplete submission.
              </li>
              <li>
                <strong>Contact Support for Issues:</strong> If you encounter
                any problems during submission, take a screenshot and contact
                technical support or your instructor immediately.
              </li>
              <li>
                <strong>Check Results and Feedback:</strong> Once the results
                are available, check your exam feedback for mistakes and areas
                of improvement.
              </li>
              <li>
                <strong>Post-Exam Reflection:</strong> After completing the
                exam, take a moment to reflect on how you performed and note
                areas you would like to improve for future exams.
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              router.push(`/student/exam/${examId}/attempt`);
            }}
          >
            Start Exam
          </button>
        </div>
      ) : (
        <div>response already submitted</div>
      )}
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

export default ExamData;
