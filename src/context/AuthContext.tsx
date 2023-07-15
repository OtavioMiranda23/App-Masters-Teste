"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
  AuthErrorCodes,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Alert from "@/components/alerts/alert";
import { FirebaseError } from "firebase/app";

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  errorMessageAuth: string;
  resetAlert: () => void;
  updatePassword: (email: string) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: JSX.Element | JSX.Element[];
}
export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessageAuth, setErrorMessageAuth] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  function handleUser(user: User | null) {
    setUser(user);
  }
  const resetAlert = () => {
    setShowAlert(false);
    setErrorMessageAuth("");
  };

  async function signUp(email: string, password: string) {
    try {
      setIsLoading(true);
      // TODO: Verificar se email é um email
      const res = await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
      setUser(res.user);
    } catch (e) {
      console.error("Erro ao logar usuário!", e);
      //alert("Erro ao cadastrar usuário");
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      resetAlert();
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      router.push("/");
      alert("Usuário logado com sucesso");
    } catch (error) {
      setShowAlert(true);
      if (error instanceof FirebaseError) {
        if (error.message.includes("auth/user-not-found")) {
          console.error(error.message);

          setErrorMessageAuth("Email ou senha incorretos.");
          return <Alert type="error" message={errorMessageAuth} />;
        }

        console.error(
          "Erro ao logar usuário!",
          error.name,
          error.code,
          error.message
        );
        setShowAlert(true);
        return setErrorMessageAuth(error.message);
      }
      setShowAlert(true);
      setErrorMessageAuth("Ocorreu algo errado");
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

  function updatePassword(email: string) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("O email para troca de senha foi enviado");
        router.push("/auth");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
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
        errorMessageAuth,
        resetAlert,
        updatePassword,
      }}
    >
      {showAlert && <Alert type="error" message={errorMessageAuth} />}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}
