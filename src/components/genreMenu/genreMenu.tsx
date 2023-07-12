"use client";
import { IGames } from "@/types/games";
import styles from "./genreMenu.module.css";
import useSearchContext from "@/hooks/useSearchContext";

interface IGenreMenu {
  data: IGames[] | undefined;
}

export function GenreMenu({ data }: IGenreMenu) {
  const uniqueGenre = Array.from(new Set(data?.map((game) => game.genre)));
  uniqueGenre.sort((a, b) => a > b ? 1 : -1);

  const { genre: currGenre, setGenre, setSearch } = useSearchContext();

  return (
    <div className={styles.container}>
      {uniqueGenre.map((genre) => (
        <p
          key={genre}
          onClick={() => {
            setGenre(genre), setSearch("");
          }}
          className={`${styles.genre} ${(genre === currGenre && styles.ativo)}`}
        >
          {genre}
        </p>
      ))}
    </div>
  );
}
