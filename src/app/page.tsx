"use client";
import styles from "./page.module.css";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/card/card";
import { IGames } from "@/types/games";
import { Header } from "@/components/header/header";
import { useEffect, useState } from "react";
import { GenreMenu } from "@/components/genreMenu/genreMenu";
import Image from "next/image";
import config from "../config/config";
import {
  filterByTitle,
  filterByGenre,
  sortAlphabetically,
} from "@/utils/filter";
import SearchContext, { SearchProvider } from "@/context/SearchContext";
import Head from "next/head";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import useSearchContext from "@/hooks/useSearchContext";
import { createLike, getLikesByUser } from "@/context/RatingContext";

export default function Home() {
  const { user, isLoading } = useAuth();
  const { search, genre: selectedGenre } = useSearchContext();
  const [selectedData, setSelectedData] = useState<IGames[] | undefined>([]);

  user && getLikesByUser(user.uid);

  //O hook useFetch retorna o estado do carregamento e a lista de jogos;
  /*Fiz uso do hook porque ele possibilita reutilizar a função em qualquer componente
   a partir do uso dos Generics, garantindo o desaclopamento.
  */
  const {
    data: games,
    isFetching,
    errorMensage,
  } = useFetch<IGames[]>(config.url, config.axiosConfig);


  //Lógica da busca:
  useEffect(() => {
    if (games == null) {
      return;
    }

    let isQuery = search.length > 0;
    let result = games;

    if (isQuery) {
      result = filterByTitle(result, search);
    }

    if (selectedGenre) {
      result = filterByGenre(result, selectedGenre);
    }

    result = sortAlphabetically(result);
    setSelectedData(result);
  }, [games, search, selectedGenre]);

  return (
    <>
      <Head>
        <title>App Masters | Jogos</title>
      </Head>
      <main className={styles.main}>
        <Header />
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
        <GenreMenu data={games} />

        <section className={styles.section}>
          {errorMensage === null &&
            selectedData?.map((game: IGames) => {
              return <Card key={game.id} data={game} />;
            })}
        </section>
      </main>
    </>
  );
}
