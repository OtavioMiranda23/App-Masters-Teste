"use client";
import styles from "./page.module.css";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/card/card";
import { IGames } from "@/types/games";
import { Header } from "@/components/header/header";
import { useEffect, useRef, useState } from "react";
import { GenreMenu } from "@/components/genreMenu/genreMenu";
import Image from "next/image";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedData, setSelectedData] = useState<IGames[] | undefined>([]);
  const [refreshList, setRefreshList] = useState(false);

  const url = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data";
  const config = {
    headers: {
      "dev-email-address": "otaviomiranda@usp.br",
    },
    timeout: 5000,
  };
  //O hook useFetch retorna o estado do carregamento e a lista de jogos;
  /*Fiz uso do hook porque ele possibilita reutilizar a função em qualquer componente
   a partir do uso dos Generics, garantindo o desaclopamento.
  */
  const {
    data: games,
    isFetching,
    errorMensage,
  } = useFetch<IGames[]>(url, config);

  //Lógica da busca:

  function restoreGameList() {
    setSelectedGenre("");
    setSearch("");
    setRefreshList(false)
  }

  function filterByTitle(games: IGames[], query: string) {
    let searchQuery = query.toLowerCase();
    setSelectedGenre("");
    return games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery)
    );
  }

  function filterByGenre(games: IGames[], query: string) {
    let searchQuery = query.toLowerCase();
    return games.filter((game) =>
      game.genre.toLowerCase().includes(searchQuery)
    );
  }

  function sortAlphabetically(games: IGames[]) {
    return games.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

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
    if (refreshList) {
      restoreGameList();
      
    }

    result = sortAlphabetically(result);
    setSelectedData(result);
  }, [games, search, selectedGenre, refreshList]);

  console.log(refreshList)
  return (
    <main className={styles.main}>
      <Header dataSearch={setSearch} setRefreshList={setRefreshList} />

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
      <GenreMenu
        data={games}
        setSelection={setSelectedGenre}
        setSearch={setSearch}
      />
      <section className={styles.section}>
        {errorMensage === null &&
          selectedData?.map((game: IGames) => {
            return (
              <Card
                key={game.id}
                genre={game.genre}
                title={game.title}
                thumbnail={game.thumbnail}
                setSearch={setSearch}
                setSelection={setSelectedGenre}
              />
            );
          })}
      </section>
    </main>
  );
}

/*
//Lógica da busca:
  function filterByTitle(games: IGames[], query: string) {
    let searchQuery = query.toLowerCase();
    setSelectedGenre("");
    return games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery)
    );
  }

  function filterByGenre(games: IGames[], query: string) {
    let searchQuery = query.toLowerCase();
    return games.filter((game) =>
      game.genre.toLowerCase().includes(searchQuery)
    );
  }

  function sortAlphabetically(games: IGames[]) {
    return games.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

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

*/
