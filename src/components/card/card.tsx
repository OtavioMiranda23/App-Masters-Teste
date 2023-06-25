import { motion } from "framer-motion";
import styles from "./card.module.css";
import Image from "next/image";
import { IGames } from "@/types/games";
import useSearchContext from "@/hooks/useSearchContext";

interface ICard {
  data: IGames;
}

export function Card({ data }: ICard) {
  const { setGenre, setSearch } = useSearchContext();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 1.5 }}
      className={styles.container}
    >
      <div className={styles.containerCard}>
        <div className={styles.containerTop}>
          <Image
            src={data.thumbnail}
            alt={`${data.title} image game`}
            width={365}
            height={206}
            layout="responsive"
            priority
            className={styles.image}
          />
        </div>
        <div className={styles.containerCenter}>
          <h2 className={styles.cardTitle}>{data.title}</h2>
        </div>
        <div
          onClick={() => {
            setGenre(data.genre), setSearch("");
          }}
          className={styles.containerBotton}
        >
          <div className={styles.marker}></div>
          <p className={styles.genre}>{data.genre}</p>
        </div>
      </div>
    </motion.div>
  );
}
