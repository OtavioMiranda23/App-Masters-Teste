"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { app, auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { DocumentData, doc, getDoc, getFirestore } from "firebase/firestore";

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  // isLoggedIn: () => boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  function handleUser(user: User | null){
    setUser(user);
  }

  async function signUp(email: string, password: string) {
    try {
      console.log(
        `Tentando criar conta com email ${email} e senha ${password}`
      );
      setIsLoading(true);
      // TODO: Verificar se email é um email
      // auth.setPersistence(browserLocalPersistence);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
      setUser(res.user);
    } catch (e) {
      console.error("Erro ao logar usuário!");
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      console.log(`Tentando logar com email ${email} e senha ${password}`);
      // auth.setPersistence(browserLocalPersistence);
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      router.push("/");
    } catch (e) {
      console.error("Erro ao logar usuário!");
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      router.push("/");
      await auth.signOut();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      handleUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        signUp,
        // isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}
