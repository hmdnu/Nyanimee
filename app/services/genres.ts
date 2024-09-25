import * as cheerio from "cheerio";
import { GenreStructure } from "~/structs/GenreStruct";
import { TGenre } from "~/types";
import { Env, gofetch, Response } from "~/utils";

export class Genres extends GenreStructure<TGenre[]> {
  private genres: TGenre[] = [];

  protected extractGenres(html: string): TGenre[] {
    const $ = cheerio.load(html);

    $("ul.genres li a").each((_, e) => {
      const name = $(e).text();
      const href = $(e).attr("href") || "";

      this.genres.push({ name, href });
    });

    return this.genres;
  }

  protected extractAnimeByGenre(param: string): TGenre[] {
    console.log(param);
    return this.genres;
  }

  async getAnimeByGenre(name: string): Promise<Response<TGenre[]>> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, `/genres/${name}`);

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const anime = this.extractAnimeByGenre(page.data as string);

    return new Response(page.status, page.statusText, anime);
  }

  async getGenres(): Promise<Response<TGenre[]>> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, "/genre-list");

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const genres = this.extractGenres(page.data as string);

    return new Response(page.status, page.statusText, genres);
  }
}
