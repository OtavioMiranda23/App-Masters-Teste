import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import useSearchContext from "@/hooks/useSearchContext";
import { useAuth } from "@/context/AuthContext";

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
            <Link href="/auth" className={styles.entrar}>Entrar</Link>
            {user && <button onClick={() => signOut()}>{user?.email} está logado!</button>}
      </div>
    </header>
  );
}
