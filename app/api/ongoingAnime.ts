import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import axios from "axios";
import { TBaseAnime } from "~/types";

function extractAnimes(anime: string) {
  const $ = cheerio.load(anime);

  const onGoingAnimes: TBaseAnime[] = [];

  $(".rapi").each((i, e) => {
    $(e)
      .find(".detpost")
      .each((i, e) => {
        const title = $(e).find(".thumbz h2").text().trimStart();
        const coverImg = $(e).find(".thumbz img").attr("src") || "";
        const href = $(e).find(".thumb a").attr("href") || "";
        const episode = $(e).find(".epz").text().trimStart();
        const day = $(e).find(".epztipe").text();

        onGoingAnimes.push({ title, coverImg, day, episode, href });
      });
  });

  return onGoingAnimes;
}

export async function getOngoingAnime(query: string) {
  const page = await axios.get(`${Env.baseUrl}/ongoing-anime/page/${query}` || "");

  if (!page.data) {
    return [];
  }

  const animes = extractAnimes(page.data);

  return animes;
}
