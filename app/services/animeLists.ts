import * as cheerio from "cheerio";
import { alphabets } from "~/constant";
import { TAnime, TAnimeLists } from "~/types";
import { Env } from "~/utils/env";
import { fetch, Response } from "~/utils";
import { AnimeStructure } from "~/structs/AnimeStruct";

export class AnimeList extends AnimeStructure<TAnimeLists[]> {
  protected extractHTML(html: string): TAnimeLists[] {
    const sortedList: TAnimeLists[] = [];

    // push the non alphabetical anime
    sortedList.push({ alphabet: "#", animes: [] });

    // push the alphabetical anime
    for (let i = 0; i < alphabets.length; i++) {
      sortedList.push({ alphabet: alphabets[i], animes: [] });
    }

    const animeLists: TAnime[] = [];

    const $ = cheerio.load(html);
    const anchorTags = $("a.hodebgst");

    anchorTags.each((_, e) => {
      const title = $(e).text().trimEnd();
      const href = $(e).attr("href") || "";

      animeLists.push({ title, href });
    });

    // group anime alphabeticaly
    for (let i = 0; i < animeLists.length; i++) {
      const firstLetter = animeLists[i].title[0].toUpperCase();
      const index = alphabets.indexOf(firstLetter);

      if (index !== -1) {
        sortedList[index + 1].animes.push(animeLists[i]);
      } else {
        sortedList[0].animes.push(animeLists[i]);
      }
    }

    return sortedList;
  }

  async get(): Promise<Response> {
    const page = await fetch(`${Env.baseUrl}/anime-list`);

    if (!page || page.status !== 200) {
      throw new Response(500, "Cant get anime lists");
    }

    const animeList = this.extractHTML(String(page?.data));

    return new Response(200, "ok", animeList);
  }
}
