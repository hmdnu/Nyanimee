import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import axios, { AxiosError } from "axios";
import { TOngoingAnimes } from "~/types";

export async function getOngoingAnime() {
  try {
    const page = await axios.get(Env.baseUrl || "");

    const $ = cheerio.load(page.data);
    const animeCards = $(".venutama .rseries .rapi").first();

    const onGoingAnimes: TOngoingAnimes[] = [];

    animeCards.each((i, e) => {
      $(e)
        .find(".detpost")
        .each((i, e) => {
          const title = $(e).find(".thumb .thumbz h2").text().trimStart();
          const coverImg = $(e).find(".thumb .thumbz img").attr("src") || "";
          const href = $(e).find(".thumb a").attr("href") || "";
          const episode = $(e).find(".epz").text().trimStart();

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
