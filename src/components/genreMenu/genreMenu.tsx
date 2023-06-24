import { IGames } from "@/types/games";
import styles from "./genreMenu.module.css";
interface IGenreMenu {
  data: IGames[] | undefined;
  setSelection: (genre: string) => void;
  setSearch: (letter: string) => void;
}

export function GenreMenu({ data, setSelection, setSearch }: IGenreMenu) {
  const uniqueGenre = Array.from(new Set(data?.map((game) => game.genre)));
  return (
    <div className={styles.container}>
      {uniqueGenre.map((genre) => (
        <p
          key={genre}
          onClick={() => {
            setSelection(genre), setSearch("");
          }}
          className={styles.genre}
        >
          {genre}
        </p>
      ))}
    </div>
  );
}
