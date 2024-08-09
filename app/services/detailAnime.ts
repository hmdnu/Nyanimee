import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import { TDetailAnime } from "~/types";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { fetch, Response } from "~/utils";

export class DetailAnime extends AnimeStructure<TDetailAnime> {
  protected extractHTML(html: string): TDetailAnime {
    const $ = cheerio.load(html);
    const details = $(".fotoanime");

    const detailAnime: TDetailAnime = {
      title: "",
      japanese: "",
      score: "",
      producer: "",
      type: "",
      status: "",
      totalEpisode: "",
      duration: "",
      releaseDate: "",
      studio: "",
      genres: "",
      coverImg: "",
      episodes: [],
    };

    if (!html || !details) return detailAnime;
    // remove episode list

    // this for anime details information, populate to detailAnime later
    const temp: string[] = [];

    // get anime detail information
    details.find(".infozin .infozingle p span").each((_, e) => {
      const detail = $(e).text().split(":")[1].trimStart();

      // push to this first then populate to detailAnime
      temp.push(detail);
    });

    const keys = Object.keys(detailAnime) as (keyof TDetailAnime)[];

    // populate detailAnime instance
    for (let i = 0; i < temp.length; i++) {
      detailAnime[keys[i]] = temp[i] as never;
    }

    // populate coverImg instance
    detailAnime.coverImg = details.find("img").attr("src") || "";

    // remove unnecesary element
    $(".episodelist:last").remove();

    // populate episodes
    $(".episodelist ul li").each((_, e) => {
      const episode = $(e).find("a").text();
      const date = $(e).find(".zeebr").text();
      const href = $(e).find("a").attr("href") || "";

      detailAnime.episodes?.push({ episode, date, href });
    });

    return detailAnime;
  }

  async get(animeTitle: string): Promise<Response> {
    const page = await fetch(`${Env.baseUrl}/anime/${animeTitle}`);

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const animes = this.extractHTML(String(page?.data));

    return new Response(200, "ok", animes);
  }
}
