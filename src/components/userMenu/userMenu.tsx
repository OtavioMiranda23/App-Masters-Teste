import { useAuth } from "@/context/AuthContext";
import styles from "./userMenu.module.css";
import Link from "next/link";

export function UserMenu() {
  const { user, signOut } = useAuth();

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.content}>
          <p className={styles.bemVindo}>Bem vindo, {user.email}!</p>
          <a className={styles.entrar} onClick={() => signOut()} href="#">
            Sair
          </a>
        </div>
      ) : (
        <div className={styles.content}>
          <p className={styles.bemVindo}>Bem vindo, visitante!</p>
          <Link href="/auth" className={styles.entrar}>
            Entrar
          </Link>
        </div>
      )}
    </div>
  );
}
