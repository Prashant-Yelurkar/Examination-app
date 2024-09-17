import React, { useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import { useRouter } from "next/router";
import styles from "./layout.module.css";
import MobileNavbar from "../Navbar/MobileNavbar";
import Navbar from "../Navbar/Navbar";
import { getAuthToken } from "@/Actions/TokenInitilizer";
import { validateJWT } from "@/Actions/Controller";
import Head from "next/head";
import { adminNavData, studentNavData } from "@/Utils/NavData";

const Layout = ({ children, alerts, title, isExamStarted }) => {
  const router = useRouter();
  const [mobNav, setmobNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [navData, setNavData] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const publicRoutes = ["/auth/login", "/auth/register"];

  const handelCloseAlert = () => {
    setIsAlert(false);
    if (alerts?.redirect) {
      setTimeout(() => {
        router.push(alerts.redirect);
      }, 200);
    }
  };
  useEffect(() => {
    if (alerts) setIsAlert(alerts.type ? true : false);
  }, [alerts]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        const res = await validateJWT(token);
        if (res.success) {
          // console.log(res);

          setIsLoggedIn(true);
          setUserData(res.user);
          setNavData(res.user.role === "admin" ? adminNavData : studentNavData);
        } else {
          setIsLoggedIn(false);
          router.push("/auth/login");
        }
      } else if (!publicRoutes.includes(router.pathname)) {
        setIsLoggedIn(false);
        router.push("/auth/login");
      }
    };
    checkAuth();
  }, [router.pathname]);

  useEffect(() => {
    if (isLoggedIn && navData.length > 0) {
      const isValidPath = navData.some((obj) => obj.link === router.pathname);
      console.log(router.pathname);

      if (!isValidPath) {
        console.log(isValidPath);

        router.push("/");
        return;
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [navData]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="canonical" href="https://localhost:3000" />
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="description" content="Examination" />
          <meta name="keywords" content="" />
          <title>{title}</title>
        </Head>
        <div>
          <main className={styles.main}>
            {!isExamStarted &&
              isLoggedIn &&
              !publicRoutes.includes(router.pathname) && (
                <div className={styles.sidebar}>
                  <MobileNavbar
                    mobNav={mobNav}
                    setmobNav={setmobNav}
                    navData={navData}
                  />
                </div>
              )}
            <div className={styles.pagesBlock}>
              {!isExamStarted &&
                isLoggedIn &&
                !publicRoutes.includes(router.pathname) && (
                  <div>
                    <Navbar setmobNav={setmobNav} mobNav={mobNav} />
                  </div>
                )}
              <div className={styles.pages}>{children}</div>
            </div>
            {isAlert && <Alert data={alerts} close={handelCloseAlert} />}
          </main>
        </div>
      </>
    );
  }
};
export default Layout;
