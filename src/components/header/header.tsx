"use client";
import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import useSearchContext from "@/hooks/useSearchContext";
import { useAuth } from "@/context/AuthContext";
import { useRating } from "@/context/RatingContext";
import { IGames } from "@/types/games";
import { useFetch } from "@/hooks/useFetch";
import config from "@/config/config";
import { useEffect, useState } from "react";
import { sortDir } from "@/context/SearchContext";

export function Header() {
  const { user, signOut } = useAuth();
  const [isLikeCheck, setIsLikeCheck] = useState();

  const {
    setSearch,
    resetFilters,
    setFilterLiked,
    toggleSortByRating,
    genre,
    setGenre,
    filterByLiked,
    sortedByRating
  } = useSearchContext();



  function verifySortByRatingRender(sortedByRating: sortDir | null) {
    if (sortedByRating === null) {
      return (
        <div>
          <span>&#9733;</span>
          <span>&#11015;</span>
        </div>
      );
    }
    if (sortedByRating == sortDir.DSC) {
      return (
        <div>
          <span>&#9733;</span>
          <span>&#11015;</span>
        </div>
      );
    }
    if (sortedByRating === sortDir.ASC) {
      return (
        <div>
          <span>&#9733;</span>
          <span className={styles.arrowDown}>&#11014;</span>
        </div>
      );
    }
  }
  


  
  const {
    data: games,
    isFetching,
    errorMensage,
  } = useFetch<IGames[]>(config.url, config.axiosConfig);
  const uniqueGenre = Array.from(
    new Set(games?.map((game: IGames) => game.genre))
  );
  uniqueGenre.sort((a, b) => (a > b ? 1 : -1));

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/logo.svg" height={100} width={250} alt="Logo" />
        </div>
      </Link>
      <div className={styles.containerMenu}>
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
          <div className={styles.dropdown}>
            <select
              className={`${styles.dropdownSelect} ${styles.input}`}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Mostrar Todos</option>
              {uniqueGenre.map((genre: string, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <div className={styles.dropdownOptions}>
              <option value="">Mostrar Todos</option>
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
          {user && (
            <>
            <p>Filtros:</p>
              <Image
                // className={`${
                //   r.liked ? styles.likeIconActive : styles.likeIconNotActive
                // }`}
                className={`${
                  //mudar classe do icone like
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
                title={filterByLiked ? 'Remover filtro de curtidos' : 'Filtrar por curtidos'}
              />
              <div
                onClick={toggleSortByRating}
                style={{
                  fontSize: "1.8rem",
                  color: "rgb(255, 166, 0)",
                  cursor: "pointer",
                }}
              >{verifySortByRatingRender(sortedByRating)}
              
               
                
                {/* &#9733; &#11014; &#11015;  */}
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
