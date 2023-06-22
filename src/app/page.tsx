"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useFetch } from "@/hooks/useFetch";

interface IGames {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
}
export default function Home() {
  const url = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data";

  const { data: games } = useFetch<IGames[]>(url);

  return (
    <main className={styles.main}>
      <h1>Games</h1>
      {games?.map((game) => {
        return (
          <div key={game.id}>
            <h2>{game.title}</h2>
            {/* <Image 
            src={game.thumbnail}
            alt={`Imagem do jogo ${game.title}`}
            height={100}
            width={100}
            /> */}
            <strong>{game.genre}</strong>
          </div>
        );
      })}
    </main>
  );
}
