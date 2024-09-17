import React, { useEffect, useState } from "react";
import styles from "./mobilenavbar.module.css";
import { CgMenuRight } from "react-icons/cg";
// import { NavData } from "@/Utils/NavData";
import NavTile from "./NavTile";
import { removeTocken } from "@/Actions/TokenInitilizer";

const MobileNavbar = (props) => {
  const { mobNav, setmobNav, navData } = props;
  const [menuText, setMenuText] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) {
        const storedMenuText = localStorage.getItem("menuText");
        return storedMenuText ? storedMenuText === "true" : false;
      }
      return true;
    }
    return true;
  });

  const toggleMenuText = () => {
    localStorage.setItem("menuText", !menuText);
    setMenuText(!menuText);
  };

  const handleResize = () => {
    if (window.innerWidth < 1024) setMenuText(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${styles.mobilenavbar} ${menuText ? "" : styles.menu}`}
      style={mobNav ? { left: 0 } : { width: "auto" }}
    >
      <div className={styles.closeBar}>
        <CgMenuRight className={styles.closeBarIcon} onClick={toggleMenuText} />
      </div>

      {navData.map((value, index) => {
        if (value.internal) return;
        return <NavTile {...value} key={index} setmobNav={setmobNav} />;
      })}
      <div
        onClick={() => {
          removeTocken();
          window.location.reload();
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default MobileNavbar;
