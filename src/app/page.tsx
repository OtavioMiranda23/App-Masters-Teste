"use client";
import styles from "./page.module.css";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/card/card";
import { IGames } from "@/types/games";
import { Header } from "@/components/header/header";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
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

  const filteredTitles =
    search.length > 0 ? games?.filter((game) => game.title.includes(search)) : [];
    console.log(filteredTitles);
  return (
    <main className={styles.main}>
      <Header data={setSearch} />
      <p>{isFetching && "Loader"}</p>
      <p>{errorMensage}</p>
      {errorMensage === null && (
        <div className={styles.containerCard}>
          <Card data={filteredTitles} />
        </div>
      )}
    </main>
  );
}
