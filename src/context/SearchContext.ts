import { createContext } from "react";

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

export default SearchContext;