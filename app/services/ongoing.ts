import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import { TBaseAnime } from "~/types";
import { gofetch } from "~/utils/fetch";
import { Response } from "~/utils/response";
import { AnimeStructure } from "~/structs/AnimeStruct";

export class OngoingAnime extends AnimeStructure<TBaseAnime[]> {
  protected extractHTML(html: string): TBaseAnime[] {
    const $ = cheerio.load(html);

    const ongoingAnimes: TBaseAnime[] = [];

    $(".rapi").each((i, e) => {
      $(e)
        .find(".detpost")
        .each((i, e) => {
          const title = $(e).find(".thumbz h2").text().trimStart();
          const coverImg = $(e).find(".thumbz img").attr("src") || "";
          const href = $(e).find(".thumb a").attr("href") || "";
          const episode = $(e).find(".epz").text().trimStart();
          const day = $(e).find(".epztipe").text();

          ongoingAnimes.push({ title, coverImg, day, episode, href });
        });
    });

    return ongoingAnimes;
  }

  async get(query: string): Promise<Response<TBaseAnime[]>> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, `/ongoing-anime/page/${query}`);

    if (!page || page.status !== 200) {
      throw new Response(Number(page?.status), String(page?.statusText));
    }

    const animes = this.extractHTML(page.data as string);

    return new Response(200, "ok", animes);
  }
}
