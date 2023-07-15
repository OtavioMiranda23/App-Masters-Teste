import React, { useEffect, useState } from "react";
import styles from "./alert.module.css";

type AlertProps = {
  type: "success" | "error" | "warning";
  message: string;
  duration?: number;
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  duration = 5000,
  onClose,
}) => {
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setClosed(true);
    onClose?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const alertClassName = `${styles.alert} ${styles[type]} ${
    closed ? styles.closed : ""
  }`;

  if (closed) {
    return null; // Não renderizar nada se o componente estiver fechado
  }
  const selectEmoji = () => {
    if (type === "error") {
      return <div>&#x1F614;</div>;
    }
    if (type === "success") {
      return <div>&#x1F603;</div>;
    }
    return <div>&#x26A0️;</div>;
  };

  return (
    <div className={alertClassName}>
      {selectEmoji()}
      <span>{message}</span>
      <button className={styles["close-btn"]} onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
