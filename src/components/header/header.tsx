import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import useSearchContext from "@/hooks/useSearchContext";
import { useAuth } from "@/context/AuthContext";
import { deleteAllGames, useRating } from "@/context/RatingContext";

export function Header() {
  const { setSearch, resetFilters } = useSearchContext();
  const { user, signOut } = useAuth();

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/logo.svg" height={100} width={250} alt="Logo" />
        </div>
      </Link>
      <div className={styles.searchContainer}>
        <div className={styles.restoreIcon}>
          <Image
            src="/refresh.svg"
            alt="Refresh icon"
            width={35}
            height={35}
            onClick={() => resetFilters()}
          />
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Busque um título..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => deleteAllGames()}>delete</button>
      </div>
      <div style={{ display: "flex", padding: "2% 5%", gap:"5rem" }}>
        {user ? (
          <>
            <p>Bem vindo, {user.email}!</p>
            <a className={styles.entrar} onClick={() => signOut()} href="#">
              Sair
            </a>
          </>
        ) : (
          <>
            <p>Bem vindo, visitante!</p>
            <Link href="/auth" className={styles.entrar}>
              Entrar
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
