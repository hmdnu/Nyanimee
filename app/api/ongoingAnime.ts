import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import axios from "axios";
import { TOngoingAnimes } from "~/types";

const HTMLTags = {
  ongoingAnime: ".venutama .rseries .rapi",
  card: ".detpost",
  title: ".thumb .thumbz h2",
  coverImg: ".thumb .thumbz img",
  href: ".thumb a",
  episode: ".epz",
  day: ".epztipe",
};

function extractAnimes(anime: string) {
  const $ = cheerio.load(anime);

  const onGoingAnimes: TOngoingAnimes[] = [];

  $(HTMLTags.ongoingAnime).each((i, e) => {
    $(e)
      .find(HTMLTags.card)
      .each((i, e) => {
        const title = $(e).find(HTMLTags.title).text().trimStart();
        const coverImg = $(e).find(HTMLTags.coverImg).attr("src") || "";
        const href = $(e).find(HTMLTags.href).attr("href") || "";
        const episode = $(e).find(HTMLTags.episode).text().trimStart();
        const day = $(e).find(HTMLTags.day).text();

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
