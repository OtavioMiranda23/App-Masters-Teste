"use client";
import AuthPanel from "@/components/authPanel/authPanel";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";

export function ForgetPassword() {
    const { user, signUp, updatePassword, errorMessageAuth, resetAlert } = useAuth();
    const [email, setEmail] = useState<string>("");
  
  
    function RecuperarSenha(e: FormEvent<any>) {
      e.preventDefault();  
      if (!email) {
        // TODO: Mostrar erros
        return;
      }
    updatePassword(email);
  };
    
    return (
        <AuthPanel
        title={"Recuperar senha"}
        subtitle={"Lembrou da senha"}
        href={"/auth"}
        mensageHref={"Login"}
        setEmail={setEmail}
        createSubmit={RecuperarSenha}
        submitNameEvent={"Recuperar senha"}
        forgetPass={false}
        isForgetPassPage={true}
        />
    )
}
export default ForgetPassword;
