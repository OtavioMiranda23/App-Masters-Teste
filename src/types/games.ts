export interface IGames {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  platform?: string;
  release_date?: string;
  game_url: string;
}
