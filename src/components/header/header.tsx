import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
interface IHeader {
  data: (search: string) => void;
}
export function Header({data}: IHeader) {

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
          onChange={(e) => data(e.target.value)}
        />

      </div>
    </header>
  );
}
