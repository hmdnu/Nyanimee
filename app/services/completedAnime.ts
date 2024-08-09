import * as cheerio from "cheerio";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { TBaseAnime } from "~/types";
import { Response, fetch } from "~/utils";
import { Env } from "~/utils/env";

export type TCompletedAnime = {
  lastPagination: string;
  completedAnimes: TBaseAnime[];
};

export class CompletedAnime extends AnimeStructure<TCompletedAnime> {
  protected extractHTML(html: string): TCompletedAnime {
    const $ = cheerio.load(html);

    const completedAnimes: TBaseAnime[] = [];

    const lastPagination = $(".pagenavix .next.page-numbers").prev().text();

    $(".detpost").each((i, e) => {
      const title = $(e).find(".jdlflm").text();
      const href = $(e).find("a").attr("href") || "";
      const coverImg = $(e).find("img").attr("src") || "";
      const totalEpisode = $(e).find(".epz").text();
      const score = $(e).find(".epztipe").text().trim();

      completedAnimes.push({ title, coverImg, href, score, totalEpisode });
    });

    return { lastPagination, completedAnimes };
  }

  async get(query: string): Promise<Response> {
    const page = await fetch(`${Env.baseUrl}/complete-anime/page/${query}`);

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const extractedAnime = this.extractHTML(String(page.data));

    return new Response(200, "ok", extractedAnime);
  }
}
