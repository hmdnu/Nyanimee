import axios from "axios";
import * as cheerio from "cheerio";
import { TSearchAnime } from "~/types";
import { Env } from "~/utils/env";

export async function searchAnime(animeTitle: string | undefined) {
  const page = await axios.get(`${Env.baseUrl}/?s=${animeTitle}&post_type=anime`);

  if (!page || !animeTitle?.trim()) return [];

  const $ = cheerio.load(page.data);

  const animeCards = $(".chivsrc li");

  const animes: TSearchAnime[] = [];

  animeCards.each((_, e) => {
    const title = $(e).find("h2 a").text();
    const href = $(e).find("h2 a").attr("href") || "";
    const coverImg = $(e).find("img").attr("src") || "";
    const status = $(e).find("div.set:eq(1)").text();

    animes.push({ title, href, coverImg, status });
  });

  return animes;
}
