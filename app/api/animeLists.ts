/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as cheerio from "cheerio";
import { alphabets } from "~/constant";
import { TAnime, TAnimeLists } from "~/types";
import { Env } from "~/utils/env";

export async function getAnimeLists() {
  const page = await axios.get(`${Env.baseUrl}/anime-list`);

  if (!page) return [];

  const sortedList: TAnimeLists[] = [];

  // push the non alphabetical anime
  sortedList.push({ alphabet: "#", animes: [] });

  // push the alphabetical anime
  for (let i = 0; i < alphabets.length; i++) {
    sortedList.push({ alphabet: alphabets[i], animes: [] });
  }

  const animeLists: TAnime[] = [];

  const $ = cheerio.load(page.data);
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
