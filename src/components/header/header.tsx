import Image from "next/image";
import styles from "./header.module.css";
interface IHeader {
  data: (search: string) => void;
}
export function Header(props: IHeader) {

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/logo.svg" height={100} width={150} alt="Logo" />
      </div>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Busque um título..."
          onChange={(e) => props.data(e.target.value)}
        />

      </div>
    </header>
  );
}
