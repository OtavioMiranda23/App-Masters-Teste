"use client";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import { FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header/header";
import AuthPanel from "@/components/authPanel/authPanel";

export default function FormLogin() {
  const { user, signUp, signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  function criarConta(e: FormEvent<any>) {
    e.preventDefault();

    if (!email || !password) {
      // TODO: Mostrar erros
      return;
    }

    signIn(email, password);
  }

  return (
    <AuthPanel
      title={"Login"}
      subtitle={"Não tem conta?"}
      href={"/auth/register"}
      mensageHref={"Registre-se"}
      setEmail={setEmail}
      setPassword={setPassword}
      createSubmit={criarConta}
      submitNameEvent={"Login"}
      forgetPass={true}
    />
  );
}
