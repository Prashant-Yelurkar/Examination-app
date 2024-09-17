import React from "react";
import styles from "./navbar.module.css";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

const Navbar = (props) => {
  return (
    <div className={styles.navbar} id="topnav">
      <div className={styles.navbar_inner}>
        <div>
          {!props.mobNav && (
            <CgMenuRight
              className={styles.burgerMenu}
              onClick={() => {
                props.setmobNav(!props.mobNav);
              }}
            />
          )}

          {props.mobNav && (
            <RxCross1
              className={styles.burgerMenu}
              onClick={() => {
                props.setmobNav(!props.mobNav);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
