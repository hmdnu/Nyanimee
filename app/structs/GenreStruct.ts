import { Response } from "~/utils";

export abstract class GenreStructure<T> {
  protected abstract extractGenres(html: string): T;
  protected abstract extractAnimeByGenre(html: string): T;
  abstract getGenres(): Promise<Response<T>>;
  abstract getAnimeByGenre(param: string): Promise<Response<T>>;
}
