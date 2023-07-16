import { IGames } from "@/types/games";

  export function filterByTitle(games: IGames[], query: string) {
    let searchQuery = query.toLowerCase();
    return games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery)
    );
  }

  export function filterByGenre(games: IGames[], query: string) {
    let searchQuery = query.toLowerCase();
    return games.filter((game) =>
      game.genre.toLowerCase() === searchQuery
    );
  }

  export function sortAlphabetically(games: IGames[]) {
    return games.sort((a, b) => (a.title > b.title ? 1 : -1));
  }