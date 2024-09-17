import React from "react";
import styles from "./alert.module.css";
const Alert = ({ data, close }) => {
  if (!data || !data.type) return null;
  const typesOfAlerts = {
    success: "alert_success",
    info: "alert_info",
    warning: "alert_warning",
    danger: "alert_danger",
  };

  const capitalizeType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.alertBox} ${styles[typesOfAlerts[data.type]]}`}>
        <span className={styles.btn} onClick={() => close()}>
          &#10060;
        </span>
        <strong>{capitalizeType(data.type)}!</strong> {data.message}
      </div>
    </div>
  );
};

export default Alert;
