"use client";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import { FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header/header";

interface IAuthPanel {
  title: string;
  subtitle: string;
  href: string;
  mensageHref: string;
  setEmail: (value: SetStateAction<string>) => void;
  setPassword: (value: SetStateAction<string>) => void;
  createSubmit: (event: FormEvent<any>) => void;
  submitNameEvent: string;
  forgetPass: boolean;
}

export default function AuthPanel({
  title,
  subtitle,
  href,
  mensageHref,
  setEmail,
  setPassword,
  createSubmit,
  submitNameEvent,
  forgetPass
}: IAuthPanel) {

  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <p>{subtitle}</p>
          <Link className={styles.link} href={href}>{mensageHref}</Link>
          <form className={styles.formContainer}>
            <label>Email:</label>
            <input
              className={styles.input}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
              className={styles.input}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.button} onClick={(e) => createSubmit(e)}>{submitNameEvent}</button>
            {forgetPass && <Link className={styles.link} href="/">Esqueci a senha!</Link>}
          </form>
        </div>
      </div>
    </>
  );
}
