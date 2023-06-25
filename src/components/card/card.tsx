import { motion } from "framer-motion";
import styles from "./card.module.css";
import Image from "next/image";

interface ICard {
  title: string;
  genre: string;
  thumbnail: string;
  setSelection: (genre: string) => void;
  setSearch: (letter: string) => void;
}

export function Card({title, genre, thumbnail, setSelection, setSearch }: ICard) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ease:"easeInOut" ,duration: 1.5 }}
      className={styles.container}
    >
      <div className={styles.containerCard}>
        <div className={styles.containerTop}>
          <Image
            src={thumbnail}
            alt={`${title} image game`}
            width={365}
            height={206}
            layout="responsive"
            priority
            className={styles.image}
          />
        </div>
        <div className={styles.containerCenter}>
          <h2 className={styles.cardTitle}>{title}</h2>
        </div>
        <div
          onClick={() => {
            setSelection(genre), setSearch("");
          }}
          className={styles.containerBotton}
        >
          <div className={styles.marker}></div>
          <p className={styles.genre}>{genre}</p>
        </div>
      </div>
    </motion.div>
  );
}
