"use client";
import styles from "./page.module.css";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/card/card";
import { IGames } from "@/types/games";
import { Header } from "@/components/header/header";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedData, setSelectedData] = useState<IGames[] | undefined>([]);

  const url = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data";
  const config = {
    headers: {
      "dev-email-address": "otaviomiranda@usp.br",
    },
    timeout: 15000,
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

  //Lógica search e genre
  useEffect(() => {
    //Se houver conteúdo digitado, torna o setSelectedGenre false e carrega o array no state setSelectedData;
    if (search.length > 0) {
      setSelectedGenre("");
      const filteredTitles = games?.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase())
      );
      setSelectedData(filteredTitles);
    }
    //Se houver seleção de gênero, então carrega a o array no state setSelectedData;
    //No componente Card, o search é zerado com uma callback;
    else if (selectedGenre) {
      const filteredGenre = games?.filter((game) =>
        game.genre.includes(selectedGenre)
      );
      setSelectedData(filteredGenre);
    }
    //Caso nada ocorra, o array original da api preenche o state;
    else {
      setSelectedData(games);
    }
  }, [games, search, selectedGenre]);

  return (
    <main className={styles.main}>
      <Header data={setSearch} />

      <p>{isFetching && "Loader"}</p>
      <p>{errorMensage}</p>
      <section className={styles.section}>
        {errorMensage === null &&
          selectedData?.map((card: IGames) => {
            return (
              <Card
                key={card.id}
                genre={card.genre}
                title={card.title}
                thumbnail={card.thumbnail}
                setSearch={setSearch}
                setSelection={setSelectedGenre}
              />
            );
          })}
      </section>
    </main>
  );
}
