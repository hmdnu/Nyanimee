import * as cheerio from "cheerio";
import { TBaseAnime } from "~/types";
import { Env } from "~/utils/env";
import { gofetch, Response } from "~/utils";
import { AnimeStructure } from "~/structs/AnimeStruct";

export class SearchAnime extends AnimeStructure<TBaseAnime[]> {
  protected extractHTML(html: string): TBaseAnime[] {
    const $ = cheerio.load(html);

    const animeCards = $(".chivsrc li");

    const animes: TBaseAnime[] = [];

    animeCards.each((_, e) => {
      const title = $(e).find("h2 a").text();
      const href = $(e).find("h2 a").attr("href") || "";
      const coverImg = $(e).find("img").attr("src") || "";
      const status = $(e).find("div.set:eq(1)").text();

      animes.push({ title, href, coverImg, status });
    });

    return animes;
  }

  async get(animeTitle: string): Promise<Response> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, `/?s=${animeTitle}&post_type=anime`);

    const anime = this.extractHTML(page?.data as string);

    return new Response(200, "ok", anime);
  }
}
