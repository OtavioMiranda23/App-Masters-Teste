import { motion } from "framer-motion";
import styles from "./card.module.css";
import Image from "next/image";
import { IGames } from "@/types/games";
import useSearchContext from "@/hooks/useSearchContext";
import { StarsRating } from "../starsRating/starsRating";
import { useState } from "react";

interface ICard {
  data: IGames;
}

export function Card({ data }: ICard) {
  const { setGenre, setSearch } = useSearchContext();
  const [liked, setLiked] = useState(false);
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
        <div className={styles.containerBottom}>
          <Image
            onClick={() => setLiked(!liked)}
            className={`${
              liked ? styles.likeIconActive : styles.likeIconNotActive
            }`}
            src="/like_red.svg"
            alt="like icon"
            width={25}
            height={25}
            priority
          />
          <StarsRating totalStars={5} />

          <div
            className={styles.marker}
            onClick={() => {
              setGenre(data.genre), setSearch("");
            }}
          ></div>
          <p className={styles.genre}>{data.genre}</p>
        </div>
      </div>
    </motion.div>
  );
}
