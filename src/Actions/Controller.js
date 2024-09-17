import { myrouter } from "./AxiosInitializer";

const registerUser = async (data) => {
  try {
    const res = await myrouter.post("/register", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (data) => {
  try {
    const res = await myrouter.post("/login", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const validateJWT = async () => {
  try {
    const res = await myrouter.get("/verify-token");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const addExam = async (data) => {
  try {
    const res = await myrouter.post("/exam/create", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllExams = async () => {
  try {
    const res = await myrouter.get("/exam");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getExamData = async (examID) => {
  try {
    const res = await myrouter.get("/exam/" + examID);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const getExamResult = async (examID) => {
  try {
    const res = await myrouter.get("/exam/result/" + examID);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const submitExam = async (data) => {
  try {
    const res = await myrouter.post("/exam/submit", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export {
  registerUser,
  loginUser,
  validateJWT,
  addExam,
  getAllExams,
  getExamData,
  getExamResult,
  submitExam,
};
