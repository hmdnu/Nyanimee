import axios from "axios";
import * as cheerio from "cheerio";
import { TBaseAnime } from "~/types";
import { Env } from "~/utils/env";

async function extractAnime(animes: string) {
  const $ = cheerio.load(animes);

  const completedAnimes: TBaseAnime[] = [];

  const lastPagination = $(".pagenavix .next.page-numbers").prev().text();

  $(".detpost").each((i, e) => {
    const title = $(e).find(".jdlflm").text();
    const href = $(e).find("a").attr("href") || "";
    const coverImg = $(e).find("img").attr("src") || "";
    const totalEpisode = $(e).find(".epz").text();
    const score = $(e).find(".epztipe").text().trim();

    completedAnimes.push({ title, coverImg, href, score, totalEpisode });
  });

  return { lastPagination, completedAnimes };
}

export async function getCompletedAnimes(query: string) {
  const page = await axios.get(`${Env.baseUrl}/complete-anime/page/${query}`);

  const extractedAnime = await extractAnime(page.data);

  return extractedAnime;
}
