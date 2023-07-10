"use client";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const { user, signUp, signIn} = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  function criarConta(e: FormEvent<any>) {
    e.preventDefault();

    if(!email || !password){
      // TODO: Mostrar erros
      return;
    }

    signIn(email, password);
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <p>Novo no site?</p>
      <a href="/"> Registre-se</a>
      <form>
        <label>Email:</label>
        <input type="email" onChange={e => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
        <button onClick={e => criarConta(e)}>Login</button>
        <a href="/">Esqueci a senha!</a>
      </form>
    </div>
  );
}
