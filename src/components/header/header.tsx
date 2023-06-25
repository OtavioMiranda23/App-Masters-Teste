import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import useSearchContext from "@/hooks/useSearchContext";

export function Header() {
  const { setSearch, resetFilters } = useSearchContext();

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/logo.svg" height={100} width={250} alt="Logo" />
        </div>
      </Link>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Busque um título..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.restoreIcon}>
          <Image
            src="/refresh.svg"
            alt="Refresh icon"
            width={35}
            height={35}
            onClick={() => resetFilters()}
          />
        </div>
      </div>
    </header>
  );
}
