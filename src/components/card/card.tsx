"use client";
import { motion } from "framer-motion";
import styles from "./card.module.css";
import Image from "next/image";
import { IGames } from "@/types/games";
import useSearchContext from "@/hooks/useSearchContext";
import { StarsRating } from "../starsRating/starsRating";
import { useState } from "react";
import {
  createLike,
  deleteAllGames,
  setLikedFalse,
  useRating,
} from "@/context/RatingContext";
import Rating from "@/types/rating";
import { useAuth } from "@/context/AuthContext";

interface ICard {
  data: IGames;
}

export function Card({ data }: ICard) {
  const { setGenre, setSearch } = useSearchContext();
  const { isGameLiked, handleLike } = useRating();
  const [liked, setLiked] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);

  const { user } = useAuth();

  const handleStarClick = async (selectedStars: number) => {
    setSelectedStars(selectedStars);

    if (user) {
      await testarDb(user.uid, data.id, liked, selectedStars);
    }
  };
  // const handleLike = () => {
  //   const newLiked = !liked;

  //   if(user){
  //     setLiked(newLiked);
  //     console.log(data.id);
  //     testarDb(user.uid, data.id, newLiked, selectedStars);
  //   }
  // };

  async function testarDb(
    userId: string,
    gameId: number,
    liked: boolean,
    rating: number
  ) {
    const teste = {
      userId: userId,
      gameId: gameId,
      liked: liked,
      rating: rating,
    }; //Age of Conan: Unchained
    console.log("TESTANDO: CRIAR LIKE " + teste);
    await createLike(teste);
  }

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
            onClick={() => handleLike(data.id)}
            className={`${
               isGameLiked(data.id) ? styles.likeIconActive : styles.likeIconNotActive
            }`}
            src="/like_red.svg"
            alt="like icon"
            width={25}
            height={25}
            priority
          />
          <StarsRating totalStars={4} onStarClick={handleStarClick} />

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
