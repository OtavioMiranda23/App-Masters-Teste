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
      <div className={styles.containerCard}>
        <div className={styles.containerTop}>
          <Image
            src={props.thumbnail}
            alt={`Imagem do jogo ${props.title}`}
            height={150}
            width={200}
            className={styles.image}
          />
        </div>
        <div className={styles.containerCenter}>
          <h2 className={styles.cardTitle}>{props.title}</h2>
        </div>
        <div
          onClick={() => {
            props.setSelection(props.genre), props.setSearch("");
          }}
          className={styles.containerBotton}
        >
          <div className={styles.marker}></div>
          <p className={styles.genre}>{props.genre}</p>
        </div>
      </div>
    </div>
  );
}
/*
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={props.thumbnail}
            alt={`Imagem do jogo ${props.title}`}
            height={150}
            width={200}
            className={styles.image}
          />
        </div>
        <h2 className={styles.cardTitle}>{props.title}</h2>
        <div className={styles.genreContainer}>
          <div className={styles.marker}></div>
          <p
            onClick={() => {
              props.setSelection(props.genre), props.setSearch("");
            }}
            className={styles.genre}
          >
            {props.genre}
          </p>
        </div>
      </div>
*/
