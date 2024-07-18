import * as cheerio from "cheerio";
import axios, { AxiosError } from "axios";
import { Env } from "~/utils/env";
import { TDetailAnime } from "~/types";

export async function getDetailAnime(animeTitle: string) {
  try {
    const page = await axios.get(`${Env.baseUrl}/anime/${animeTitle}`);

    const $ = cheerio.load(page.data);
    const details = $(".fotoanime");

    const detailAnime: TDetailAnime = {
      title: "",
      japanese: "",
      score: "",
      producer: "",
      status: "",
      totalEpisode: "",
      type: "",
      duration: "",
      releaseDate: "",
      studio: "",
      genres: "",
      coverImg: "",
    };

    if (!page || !details) return detailAnime;

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

    return detailAnime;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        error: error.message,
        status: error.status,
      };
    }
  }
}
