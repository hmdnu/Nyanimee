import * as cheerio from "cheerio";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { TGenre } from "~/types";
import { Env, gofetch, Response } from "~/utils";

export class Genres extends AnimeStructure<TGenre[]> {
  private genres: TGenre[] = [];

  protected extractHTML(html: string): TGenre[] {
    const $ = cheerio.load(html);

    $("ul.genres li a").each((_, e) => {
      const name = $(e).text();
      const href = $(e).attr("href") || "";

      this.genres.push({ name, href });
    });

    return this.genres;
  }

  async get(): Promise<Response> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, "/genre-list");

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const genres = this.extractHTML(page.data as string);

    return new Response(200, "ok", genres);
  }
}
