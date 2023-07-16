"use client";
import { motion } from "framer-motion";
import styles from "./card.module.css";
import Image from "next/image";
import { IGames } from "@/types/games";
import useSearchContext from "@/hooks/useSearchContext";
import { StarsRating } from "../starsRating/starsRating";
import { useRating } from "@/context/RatingContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ICard {
  data: IGames;
}

export function Card({ data }: ICard) {
  const router = useRouter();
  const { user } = useAuth();
  const { setGenre, setSearch } = useSearchContext();
  const { handleLike, getRating, handleRating } = useRating();

  const defaultRating = {
    gameId: data.id,
    liked: false,
    rating: 0,
    ratingId: "",
  };
  const r = getRating(data.id) || defaultRating;

  function setStars(newRating: number) {
    if (!user) {
      router.push("/auth");
      alert("Você precisa estar logado para fazer isso!");
    }
    handleRating(r.gameId, newRating);
  }

  function setLiked() {
    if (!user) {
      router.push("/auth");
      alert("Você precisa estar logado para fazer isso!");
    }
    handleLike(r.gameId);
  }

  return (
    
    <div className={styles.card}>

      <Image
        src={data.thumbnail}
        alt={`${data.title} image game`}
        width={365}
        height={206}
        layout="responsive"
        priority
        className={styles.image}
      />
      <div className={styles.imageOverlay}></div>
      <div className={styles.ratingContainer}>
        <Image
          onClick={setLiked}
          className={`${
            r.liked ? styles.likeIconActive : styles.likeIconNotActive
          }`}
          src="/like_red.svg"
          alt="like icon"
          width={50}
          height={50}
          priority
        />
 
        <div className={styles.stars}>
          <StarsRating rating={r.rating} onSetRating={setStars} />
        </div>

        <div className={styles.imageOverlay2}></div>

        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.infos}>
          <p className={styles.genre} onClick={() => {
          setGenre(data.genre), setSearch("")}}
          >{data.genre}</p>
          <p>{data.release_date?.substring(0, 4)}</p>
          <a className={styles.link} target="_blank" href={data.game_url}>
            Acesse
          </a>
        </div>

      </div>

    </div>
  );
}