"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
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
  const [showAlertError, setShowAlertError] = useState(false);
  const [sucessMessageAuth, setSucessMessageAuth] = useState<string>("");
  const [showAlertSucess, setShowAlertSucess] = useState(false);
  const router = useRouter();

  function handleUser(user: User | null) {
    setUser(user);
  }
  const resetAlert = () => {
    setShowAlertError(false);
    setErrorMessageAuth("");
  };

  async function signUp(email: string, password: string) {
    setShowAlertSucess(false);
    try {
      resetAlert();
      setIsLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setShowAlertSucess(true);
      setSucessMessageAuth("Usuário criado com sucesso");
      router.push("/");
      setUser(res.user);
    } catch (error) {
      setShowAlertError(true);

      if (error instanceof FirebaseError) {
        if (error.message.includes("auth/user-not-found") || error.message.includes("auth/wrong-password")) {
          console.error(error.message);
          return setErrorMessageAuth("Email ou senha incorretos.");
        }

        console.error(
          "Erro ao logar usuário!",
          error.name,
          error.code,
          error.message
        );
        return setErrorMessageAuth(error.message);
      }

      setErrorMessageAuth("Ocorreu algo errado");
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    setShowAlertSucess(false);
    try {
      setIsLoading(true);
      resetAlert();
      const res = await signInWithEmailAndPassword(auth, email, password);
      setShowAlertSucess(true);
      setSucessMessageAuth("Usuário logado com sucesso");
      setUser(res.user);
      router.push("/");
    } catch (error) {
      setShowAlertError(true);

      if (error instanceof FirebaseError) {
        if (error.message.includes("auth/user-not-found" ) || error.message.includes("auth/wrong-password")) {
          console.error(error.message);
          return setErrorMessageAuth("Email ou senha incorretos.");
        }

        console.error(
          "Erro ao logar usuário!",
          error.name,
          error.code,
          error.message
        );
        return setErrorMessageAuth(error.message);
      }

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
    setShowAlertSucess(false);
    resetAlert();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSucessMessageAuth("Um email para a troca de senha foi enviado");
        setShowAlertSucess(true);

        router.push("/auth");
      })
      .catch((error) => {
        setShowAlertError(true);

        if (error instanceof FirebaseError) {
          if (error.message.includes("auth/user-not-found")) {
            console.error(error.message);
            return setErrorMessageAuth("Email ou senha incorretos.");
          }

          console.error(
            "Erro ao logar usuário!",
            error.name,
            error.code,
            error.message
          );
          return setErrorMessageAuth(error.message);
        }
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
      {showAlertError && <Alert type="error" message={errorMessageAuth} />}
      {showAlertSucess && <Alert type="success" message={sucessMessageAuth} />}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}
