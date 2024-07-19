import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import axios, { AxiosError } from "axios";
import { TOngoingAnimes } from "~/types";

const HTMLTags = {
  animeCards: ".venutama .rseries .rapi",
  card: ".detpost",
  title: ".thumb .thumbz h2",
  coverImg: ".thumb .thumbz img",
  href: ".thumb a",
  episode: ".epz",
};

export async function getOngoingAnime() {
  try {
    const page = await axios.get(Env.baseUrl || "");

    const $ = cheerio.load(page.data);
    const animeCards = $(HTMLTags.animeCards).first();

    const onGoingAnimes: TOngoingAnimes[] = [];

    animeCards.each((i, e) => {
      $(e)
        .find(HTMLTags.card)
        .each((i, e) => {
          const title = $(e).find(HTMLTags.title).text().trimStart();
          const coverImg = $(e).find(HTMLTags.coverImg).attr("src") || "";
          const href = $(e).find(HTMLTags.href).attr("href") || "";
          const episode = $(e).find(HTMLTags.episode).text().trimStart();

          onGoingAnimes.push({ title, episode, href, coverImg });
        });
    });

    return onGoingAnimes;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      return {
        error: error.message,
        status: error.status,
      };
    }
  }
}
