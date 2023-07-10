"use client";
import { IGames } from "@/types/games";
import { createContext, useState } from "react";

interface ISearchContext {
  search:string;
  genre:string;
  setSearch: (search:string) => any;
  setGenre: (genre:string) => any;
  resetFilters: () => any;
}

const SearchContext = createContext<ISearchContext>({
    search: "",
    genre: "",
    setSearch: (search: string) => {},
    setGenre: (genre: string) => {},
    resetFilters: () => {},
});


export function SearchProvider({children}:{children:JSX.Element | JSX.Element[]}){
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  function restoreGameList() {
    setSelectedGenre("");
    setSearch("");
  }

  function setarGenre(newGenre: string) {
    setSelectedGenre(newGenre === selectedGenre ? "" : newGenre);
  }
  return(
    <SearchContext.Provider
      value={{
          search,
          setSearch,
          genre: selectedGenre,
          setGenre: setarGenre,
          resetFilters: restoreGameList,
      }}>
      {children}
    </SearchContext.Provider>
  )
}


export default SearchContext;