import styles from "./card.module.css";
import Image from "next/image";

interface ICard {
  title: string;
  genre: string;
  thumbnail: string;
  setSelection: (genre: string) => void;
  setSearch: (letter: string) => void;
}

export function Card(props: ICard) {
  return (
    <div className={styles.container}>
      <h1 className={styles.titleContainer}>Games</h1>
      <div className={styles.cardContainer}>
        <div className={styles.cardText}>
          <h2 className={styles.cardTitle}>{props.title}</h2>
          <p
            onClick={() => {
              props.setSelection(props.genre), props.setSearch("");
            }}
            className={styles.genre}
          >
            {props.genre}
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={props.thumbnail}
            alt={`Imagem do jogo ${props.title}`}
            height={100}
            width={150}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
