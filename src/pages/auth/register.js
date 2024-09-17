import Layout from "@/Components/Layout/Layout";
import React, { useState } from "react";
import styles from "./form.module.css";
import Link from "next/link";
import { registerUser } from "@/Actions/Controller";
import debounce from "@/Actions/debounce";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cmPassword, setCmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [alertBox, setAlertBox] = useState({});

  const debouncedHandleSubmit = debounce(() => {
    const data = async () => {
      const result = await registerUser({
        name: name,
        email: email,
        password: password,
      });
      if (result.success) {
        setAlertBox({
          type: result.type,
          message: result.message,
          redirect: "/auth/login",
        });
      } else {
        setAlertBox({
          type: result.type,
          message: result.message,
          redirect: "/auth/register",
        });
      }
    };
    data();
  }, 300);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");

    if (!name || !password || !cmPassword || !email) {
      setAlertBox({ message: "All fields are required", type: "danger" });
      return;
    }

    if (password !== cmPassword) {
      setAlertBox({ message: "Passwords do not match", type: "danger" });
      return;
    }

    debouncedHandleSubmit();
  };

  return (
    <Layout alerts={alertBox} title={"Examination | Register"}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>Register</h3>

          <div className={styles.inputField}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputField}>
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputField}>
            <label htmlFor="password">Password</label>
            <input
              type={hidePassword ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputField}>
            <label htmlFor="cmpassword">Confirm Password</label>
            <input
              type={hidePassword ? "password" : "text"}
              id="cmpassword"
              name="cmpassword"
              placeholder="Confirm your password"
              onChange={(e) => setCmPassword(e.target.value)}
            />
          </div>

          <span className={styles.checkbox}>
            <input
              type="checkbox"
              checked={!hidePassword}
              onChange={() => setHidePassword(!hidePassword)}
            />
            Show Password
          </span>

          <div className={styles.inputField}>
            <button className={styles.btn}>Register</button>
          </div>

          <span className={`${styles.center} ${styles.mt_10}`}>
            Already have an account?{" "}
            <Link href="/auth/login" className={styles.link}>
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
