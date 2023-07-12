import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import useSearchContext from "@/hooks/useSearchContext";
import { useAuth } from "@/context/AuthContext";
import { useRating } from "@/context/RatingContext";

export function Header() {
  const { user, signOut } = useAuth();
  const { setSearch, resetFilters, setFilterLiked, toggleSortByRating } = useSearchContext();

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/logo.svg" height={100} width={250} alt="Logo" />
        </div>
      </Link>
      <div
        style={{
          display: "flex",
          padding: "1rem 2rem",
          alignItems: "baseline",
          justifyContent: "space-between",
          color: "#fff",
          gap: "5rem",
          backgroundColor: "#333",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Busque um título..."
            className={styles.input}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select name="" id="">
            <option>[-- Selecionar Gênero --]</option>
          </select>
          {user && (
            <>
              <Image
                // className={`${
                //   r.liked ? styles.likeIconActive : styles.likeIconNotActive
                // }`}
                src="/like_red.svg"
                onClick={setFilterLiked}
                alt="like icon"
                width={25}
                height={25}
                priority
              />
              <div
              onClick={toggleSortByRating}
              style={{
                fontSize:"1.8rem",
                color: "rgb(255, 166, 0)",
                cursor: "pointer"
              }}>
                &#9733;
                &#11014;
                &#11015;
              </div>
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
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
      </div>
    </header>
  );
}
