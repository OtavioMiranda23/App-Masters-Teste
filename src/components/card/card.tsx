import { IGames } from "@/types/games";
import styles from "./card.module.css";
import Image from "next/image";

interface ICard {
  data: IGames[] |  undefined,
  setSelection: (genre:string)=> void
}

export function Card(props: ICard) {
  return (
    <div className={styles.container}>
      <h1 className={styles.titleContainer}>Games</h1>

      {props.data?.map((game) => {
        return (
          
          <div key={game.id} className={styles.cardContainer}>
            <div className={styles.cardText}>
              <h2 className={styles.cardTitle}>{game.title}</h2>
              <p onClick={()=> props.setSelection(game.genre)} className={styles.genre}>{game.genre}</p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src={game.thumbnail}
                alt={`Imagem do jogo ${game.title}`}
                height={100}
                width={150}
                className={styles.image}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
