import React, { useState } from "react";
import styles from "./dropMenu.module.css";
import Image from "next/image";


export function DropMenu({ children }: { children: React.ReactNode }) {
    const [dropMenuIsOpen, setDropMenuIsOpen ] = useState(false);
    const toggleDropMenu = () => {
        setDropMenuIsOpen(!dropMenuIsOpen);
      };

  return (
    <div className={styles.menuContainer}>
    <input
      type="checkbox"
      id="dropToggle"
      className={styles.menuToggle}
      checked={dropMenuIsOpen}
      onChange={toggleDropMenu}
    />
    <label htmlFor="dropToggle" className={styles.menuBtn}>
      <Image src="/user.png"
      width={25}
      height={25}
      alt="User icon"
      className={styles.hamburger}/>


    </label>
    <ul className={`${styles.menuDrop} ${dropMenuIsOpen ? styles.openDrop : ""}`}>
      <li className={styles.item}>
      {children}
      </li>
    </ul>
  </div>
  );
}
