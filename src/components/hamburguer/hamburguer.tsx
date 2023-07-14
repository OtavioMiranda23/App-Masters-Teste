import React, { useState } from "react";
import styles from "./hamburguer.module.css";
import Image from "next/image";
import useSearchContext from "@/hooks/useSearchContext";
import { IGames } from "@/types/games";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRating } from "@/context/RatingContext";

const HamburguerMenu = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    setSearch,
    resetFilters,
    setFilterLiked,
    toggleSortByRating,
    genre,
    setGenre,
    filterByLiked,
    sortedByRating,
    games,
  } = useSearchContext();
  const {verifySortByRatingRender} = useRating();

  const uniqueGenre = Array.from(
    new Set(games?.map((game: IGames) => game.genre))
  );
  uniqueGenre.sort((a, b) => (a > b ? 1 : -1));
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <input
        type="checkbox"
        id="menu-toggle"
        className={styles.menuToggle}
        checked={menuOpen}
        onChange={toggleMenu}
      />
      <label htmlFor="menu-toggle" className={styles.menuBtn}>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </label>
      <ul className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <li className={styles.li}>
          <select
            className={`${styles.dropdownSelect} ${styles.input}`}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Mostrar Todos</option>
            {uniqueGenre.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </li>
        <li className={styles.li}>
          <div className={styles.filterOptions}>
            <Image
              // className={`${
              //   r.liked ? styles.likeIconActive : styles.likeIconNotActive
              // }`}
              className={`${
                //mudar classe do icone like
                filterByLiked ? styles.likeIconActive : styles.likeIconNotActive
              }`}
              src="/like_red.svg"
              onClick={setFilterLiked}
              alt="like icon"
              width={25}
              height={25}
              priority
              title={
                filterByLiked
                  ? "Remover filtro de curtidos"
                  : "Filtrar por curtidos"
              }
            />
          </div>
        </li>
        <li className={styles.li}>
        <div
                onClick={toggleSortByRating}
                style={{
                  fontSize: "1.8rem",
                  color: "rgb(255, 166, 0)",
                  cursor: "pointer",
                }}
              >
                {verifySortByRatingRender(sortedByRating)}

                {/* &#9733; &#11014; &#11015;  */}
              </div>
            
        </li>
        <li>
          {user ? (
            <div>
              <p className={styles.bemVindo}>Bem vindo, {user.email}!</p>
              <a className={styles.entrar} onClick={() => signOut()} href="#">
                Sair
              </a>
            </div>
          ) : (
            <>
              <p>Bem vindo, visitante!</p>
              <Link href="/auth" className={styles.entrar}>
                Entrar
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default HamburguerMenu;
