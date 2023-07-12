"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: JSX.Element | JSX.Element[];
}
export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  function handleUser(user: User | null) {
    setUser(user);
  }

  async function signUp(email: string, password: string) {
    try {
      setIsLoading(true);
      // TODO: Verificar se email é um email
      const res = await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
      setUser(res.user);
    } catch (e) {
      console.error("Erro ao logar usuário!", e);
      alert("Erro ao cadastrar usuário")
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      router.push("/");
    } catch (e) {
      console.error("Erro ao logar usuário!");
      alert("Erro ao logar usuário")
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
