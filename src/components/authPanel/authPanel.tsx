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
  forgetPass,
}: IAuthPanel) {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  
  function validateEmail(email: string) {
    let error = "";
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) != true) {
      return (error = "o campo não esta válido. ");
    }
    return error;
  }
  function validatePassword(password: string) {
    let error = "";
    if (password.length < 6) {
      error = "A senha deve ter ao menos 6 caracteres";
    }
    return error;
  }
  function handleEmailChange(email: string) {
    const error = validateEmail(email);
    setEmailError(error);
    setEmail(email);
  }
  function handlePasswordChange(password: string) {
    const error = validatePassword(password);
    setPasswordError(error);
    setPassword(password);
  }
  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <p>{subtitle}</p>
          <Link className={styles.link} href={href}>
            {mensageHref}
          </Link>
          <form className={styles.formContainer}>
            <label>Email:</label>
            <input
              className={styles.input}
              type="email"
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {emailError && <p className={styles.errorMensage}>{emailError}</p>}
            <label>Password:</label>
            <input
              className={styles.input}
              type="password"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {passwordError && <p className={styles.errorMensage}>{passwordError}</p>}
            <button className={emailError || passwordError ? styles.buttonDisable : styles.button} onClick={(e) => createSubmit(e)}>
              {submitNameEvent}
            </button>
            {forgetPass && (
              <Link className={styles.link} href="/">
                Esqueci a senha!
              </Link>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
