import React from "react";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a 
      className={styles.content}
      href="https://github.com/OtavioMiranda23" target="_blank">
        Obrigado pela visita!
      </a>
      <p>&#x1F603;</p>
    </footer>
  );
}

export default Footer;
