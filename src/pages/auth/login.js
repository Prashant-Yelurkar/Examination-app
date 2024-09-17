import Layout from "@/Components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./form.module.css";
import debounce from "@/Actions/debounce";
import { loginUser, validateJWT } from "@/Actions/Controller";
import {
  getAuthToken,
  removeTocken,
  setAuthToken,
} from "@/Actions/TokenInitilizer";
import { useRouter } from "next/router";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [alertBox, setAlertBox] = useState({});
  const router = useRouter();

  const debouncingLoging = debounce(() => {
    const login = async () => {
      const res = await loginUser({
        username: username,
        password: password,
      });
      if (res.success) {
        if (setAuthToken(res.token)) {
          setTimeout(() => {
            router.push("/");
          }, 500);
        }
      } else {
        setUsername("");
        setPassword("");
        setAlertBox({ type: "danger", message: res.message });
      }
    };
    login();
  }, 300);

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setAlertBox({
        type: "danger",
        message: "Username and Password are required.",
      });
      return;
    }
    debouncingLoging();
  };

  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      const login = async () => {
        const res = await validateJWT();

        if (res.success) {
          router.push("/");
        } else {
          removeTocken();
        }
      };
      login();
    }
  }, []);
  return (
    <Layout alerts={alertBox} title={"Examination | Login"}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handelSubmit}>
          <h3 className={styles.title}>Login </h3>
          <div className={styles.inputField}>
            <label htmlFor="username">Username </label>
            <input
              type="email"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputField}>
            <button className={styles.btn}>Login</button>
          </div>
          <div className={styles.flex}>
            <span className={styles.checkbox}>
              <input
                type="checkbox"
                value={remember}
                onChange={() => {
                  setRemember(!remember);
                }}
              />
              Remember me
            </span>

            <Link href="" className={styles.link}>
              Forget Password?
            </Link>
          </div>

          <span className={`${styles.center} ${styles.mt_10}`}>
            Don't have an account?
            <Link href="/auth/register" className={styles.link}>
              Rigister
            </Link>
          </span>
        </form>
      </div>
    </Layout>
  );
};

export default login;
