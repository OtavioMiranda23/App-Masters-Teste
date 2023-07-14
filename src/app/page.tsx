"use client";
import styles from "./page.module.css";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/card/card";
import { IGames } from "@/types/games";
import { useEffect } from "react";
import Image from "next/image";
import config from "../config/config";
import useSearchContext from "@/hooks/useSearchContext";
import Alert from "@/components/alerts/alert";
// import { createLike, getLikesByUser } from "@/context/RatingContext";

export default function Home() {
  const { setGames, selectedData } = useSearchContext();

  //O hook useFetch retorna o estado do carregamento e a lista de jogos;
  /*Fiz uso do hook porque ele possibilita reutilizar a função em qualquer componente
   a partir do uso dos Generics, garantindo o desaclopamento.
  */
  const {
    data: games,
    isFetching,
    errorMensage,
  } = useFetch<IGames[]>(config.url, config.axiosConfig);

  useEffect(() => {
    setGames(games || []);
  }, [games, setGames]);


  return (
    <main className={styles.main}>
      <Alert  type="success" message="Sucesso! Usuário criado!"/>
      <div>
        {isFetching && (
          <Image
            src="/loader.svg"
            alt="Loading icon"
            height={100}
            width={100}
            className={styles.loader}
          />
        )}
      </div>
      <p className={styles.errorMensage}>{errorMensage}</p>

      <section className={styles.section}>
        {errorMensage === null &&
          selectedData?.map((game: IGames) => {
            return <Card key={game.id} data={game} />;
          })}
      </section>
    </main>
  );
}
