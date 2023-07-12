"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import styles from "./page.module.css";
import { Header } from "@/components/header/header";
import AuthPanel from "@/components/authPanel/authPanel";

export default function Register() {
  const { user, signUp } = useAuth();

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
    <AuthPanel
      title="Criar Conta"
      subtitle="Já tem uma conta?"
      mensageHref="Faça o login"
      href="/auth"
      setEmail={setEmail}
      setPassword={setPassword}
      createSubmit={criarConta}
      submitNameEvent="Criar Conta"
      forgetPass={false}
    />
  );
}
