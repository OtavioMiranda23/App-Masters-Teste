"use client";
import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import useSearchContext from "@/hooks/useSearchContext";
import { useAuth } from "@/context/AuthContext";
import { IGames } from "@/types/games";
import HamburguerMenu from "../hamburguer/hamburguer";
import { useRating } from "@/context/RatingContext";

export function Header() {
  const { user } = useAuth();

  const {
    setSearch,
    setFilterLiked,
    toggleSortByRating,
    setGenre,
    filterByLiked,
    sortedByRating,
    games,
    toggleFuzzySearch,
    genre,
  } = useSearchContext();

  const uniqueGenre = Array.from(
    new Set(games?.map((game: IGames) => game.genre))
  );
  uniqueGenre.sort((a, b) => (a > b ? 1 : -1));

  const { verifySortByRatingRender } = useRating();
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/logo.svg" height={100} width={250} alt="Logo" />
        </div>
      </Link>
      <div className={styles.containerMenu}>
        <HamburguerMenu />
        <div className={styles.containerSearchGenreMenu}>
          <div className={styles.dropdown}>
            <select
              value={genre}
              className={`${styles.dropdownSelect} ${styles.input}`}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Mostrar todos gêneros</option>
              {uniqueGenre.map((genre: string, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <div className={styles.dropdownOptions}>
              <option value="">Mostrar todos gêneros</option>
              {uniqueGenre.map((genre: string, index) => (
                <option
                  key={index}
                  value={genre}
                  className={styles.dropdownOption}
                >
                  {genre}
                </option>
              ))}
            </div>
          </div>
          <input
            type="text"
            placeholder="Busque um título..."
            className={styles.input}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.buscaAmpla}>
            <input type="checkbox" onChange={() => toggleFuzzySearch()} />
            <p>Busca ampla</p>
          </div>
          {user && (
            <div className={styles.filters}>
              <p>Filtros</p>
              <Image
                className={`${
                  filterByLiked
                    ? styles.likeIconActive
                    : styles.likeIconNotActive
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
              <div className={styles.sortByRating} onClick={toggleSortByRating}>
                {verifySortByRatingRender(sortedByRating)}

                {/* &#9733; &#11014; &#11015;  */}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
