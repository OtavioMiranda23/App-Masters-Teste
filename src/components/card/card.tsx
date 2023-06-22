import { IGames } from "@/types/games";

export function Card({ data }: { data: IGames[] | null }) {
  return (
    <div>
      <h1>Games</h1>

      {data?.map((game) => {
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
    </div>
  );
}
