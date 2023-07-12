"use client";
import { IGames } from "@/types/games";
import {
  filterByTitle,
  filterByGenre,
  sortAlphabetically,
} from "@/utils/filter";
import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useRating } from "./RatingContext";

interface ISearchContext {
  search: string;
  genre: string;
  selectedData: IGames[];
  setGames: (games: IGames[]) => any;
  setSearch: (search: string) => any;
  setGenre: (genre: string) => any;
  setFilterLiked: () => any;
  filterByLiked: boolean;
  resetFilters: () => any;
  toggleSortByRating: () => any;
  sortedByRating: sortDir | null;
  games: IGames[]

}

const SearchContext = createContext<ISearchContext>({
  search: "",
  selectedData: [],
  genre: "",
  setSearch: (search: string) => {},
  setGenre: (genre: string) => {},
  setGames: (games: IGames[]) => {},
  setFilterLiked: () => {},
  resetFilters: () => {},
  toggleSortByRating: () => {},
  filterByLiked: false,
  sortedByRating: null,
  games: []

});

export function SearchProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const { user } = useAuth();
  const { getRating, getRatedGames } = useRating();
  const [games, setGames] = useState<IGames[]>([]);
  const [selectedData, setSelectedData] = useState<IGames[]>([]);

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filterByLiked, setFilterByLiked] = useState(false);
  const [sortedByRating, setSortedByRating] = useState<sortDir | null>(null);

 
  
  function restoreGameList() {
    setSelectedGenre("");
    setSearch("");
  }

  function toggleFilterLiked() {
    setFilterByLiked((stateAtual) => !stateAtual);
  }

  function toggleSortByRating() {
    setSortedByRating((atual) => {
      if (atual === sortDir.DSC) {
        return sortDir.ASC;
      } else if (atual === sortDir.ASC) {
        return null;
      } else {
        return sortDir.DSC;
      }
    });
  }

  function setarGenre(newGenre: string) {
    setSelectedGenre(newGenre === selectedGenre ? "" : newGenre);
  }

  const filterLiked = useCallback(
    (games: IGames[]) => {
      return games.filter((g) => {
        const match = getRating(g.id);
        return match && match.liked;
      });
    },
    [getRating]
  );

  const sortByRating = useCallback(
    (games: IGames[]) => {
      // De todos jogos, separar aqueles que tem uma avaliação
      let avaliados = getRatedGames(games);

      if (!avaliados) return games;

      // Ordenar esses jogos por avaliação
      let ordenados = avaliados.sort((a, b) => {
        const matchA = getRating(a.id);
        const matchB = getRating(b.id);

        if (!matchA || !matchB) {
          throw new Error(
            "SearchContext$sortByRating recebeu um array de jogos não-avaliados (???)"
          );
        }

        if (sortedByRating === sortDir.ASC) {
          return matchA.rating - matchB.rating;
        } else {
          return matchB.rating - matchA.rating;
        }
      });

      // concatenar os outros jogos sem avaliação no final da lista
      let idsAvaliados = avaliados.map((g) => g.id);
      let naoAvaliados = games.filter((g) => !idsAvaliados.includes(g.id));

      return [...ordenados, ...naoAvaliados];
    },
    [getRating, getRatedGames, sortedByRating]
  );

  useEffect(() => {
    console.log(sortedByRating);
  }, [sortedByRating]);

  // useEffect que lida com todos os filtros
  useEffect(() => {
    let isQuery = search.length > 0;
    let result = games;

    if (isQuery) {
      result = filterByTitle(result, search);
    }

    if (selectedGenre) {
      result = filterByGenre(result, selectedGenre);
    }

    if (user && filterByLiked) {
      result = filterLiked(result);
    }

    if (user && sortedByRating) {
      result = sortByRating(result);
    } else {
      result = sortAlphabetically(result);
    }

    setSelectedData(result);
  }, [
    search,
    games,
    selectedGenre,
    user,
    filterLiked,
    filterByLiked,
    sortByRating,
    sortedByRating,
  ]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setGames,
        setFilterLiked: toggleFilterLiked,
        setSearch,
        selectedData,
        genre: selectedGenre,
        setGenre: setarGenre,
        resetFilters: restoreGameList,
        toggleSortByRating,
        filterByLiked,
        sortedByRating,
        games
        
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export enum sortDir {
  "ASC" = "ASC",
  "DSC" = "DSC",
}

export default SearchContext;
