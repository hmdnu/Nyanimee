import axios from "axios";
import { Env } from "~/utils/env";
import * as cheerio from "cheerio";

async function fetchStreamUrl(animeEpisode: string) {
  const page = await axios.get(`${Env.baseUrl}/episode/${animeEpisode}`);

  const $ = cheerio.load(page.data);

  const streamUrl = $("iframe").attr("src") || "";

  return streamUrl;
}

export async function getStreamAnime(animeEpisode: string) {
  const streamUrl = await fetchStreamUrl(animeEpisode);

  const streamPage = await axios.get(streamUrl);
  const $ = cheerio.load(streamPage.data);

  $(".box_item_ads_popup").remove();

  return $.html();
}
