"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { app, auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { DocumentData, doc, getDoc, getFirestore } from "firebase/firestore";

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [user, setUser] = useState<User | null >(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  
  
  // useEffect(() => {
  //   // Recuperar o estado de autenticação do cookie, se disponível
  //   const userIdFromCookie = getCookie("userId");
  //   if (userIdFromCookie) {
  //     // Autenticar o usuário com base nas informações do cookie
  //     const fetchUser = async () => {
  //       try {
  //         // Implemente a lógica para recuperar os detalhes do usuário do banco de dados
  //         // com base no ID do usuário do cookie
  //         const user = await getUserDetails(userIdFromCookie);
  //         setUser(user);
  //       } catch (error) {
  //         console.error("Erro ao recuperar detalhes do usuário:", error);
  //       }
  //     };

  //     fetchUser();
  //   }
  // }, []);

  async function signUp(email: string, password: string) {
    try {
      console.log(
        `Tentando criar conta com email ${email} e senha ${password}`
      );
      setIsLoading(true);
      // TODO: Verificar se email é um email
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
      // TODO: Verificar se email é um email
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          // Ocorreu um erro ao definir a persistência
          console.error("Erro ao definir a persistência:", error);
        });
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

// // Função utilitária para obter um cookie pelo nome
// function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
//   return null;
// }

// // Função utilitária para definir um cookie
// function setCookie(name: string, value: string, days = 365) {
//   const date = new Date();
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//   const expires = `expires=${date.toUTCString()}`;
//   document.cookie = `${name}=${value}; ${expires}; path=/`;
// }

// // Função utilitária para remover um cookie
// function removeCookie(name: string) {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

// // Função para recuperar os detalhes do usuário do Firestore com base no ID do usuário
// const getUserDetails = async (userId: string) => {
//   try {
//     // Obtém uma referência para o documento do usuário no Firestore
//     const userRef = doc(getFirestore(app), "users", userId);

//     // Recupera os dados do documento do usuário
//     const userSnapshot = await getDoc(userRef);

//     if (userSnapshot.exists()) {
//       // Retorna os detalhes do usuário se o documento existir
//       return userSnapshot.data();
//     } else {
//       throw new Error("Usuário não encontrado");
//     }
//   } catch (e) {
//     throw new Error("Erro ao recuperar detalhes do usuário: ");
//   }
// };
