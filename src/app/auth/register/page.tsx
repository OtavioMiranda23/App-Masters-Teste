"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import styles from "./page.module.css";

export default function Register() {
  const { user, signUp } = useAuth();

  // TODO: Usar um componente só pra lidar com Login e Registro

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  function criarConta(e: FormEvent<any>) {
    e.preventDefault();

    if (!email || !password) {
      // TODO: Mostrar erros
      return;
    }

    signUp(email, password);
  }

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <p>Já tem uma conta?</p>
      <a href="/">Login</a>
      <form>
        <label>Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={(e) => criarConta(e)}>Create</button>
      </form>
    </div>
  );
}
