import * as cheerio from "cheerio";
import axios from "axios";
import { TDownloadAnimeUrl, TDownloadProvider } from "~/types";
import { Env } from "~/utils/env";

export async function getAnimeDownloadUrl(animeEpisode: string | undefined, type: string | undefined) {
  const page = await axios.get(`${Env.baseUrl}/${type}/${animeEpisode}`);

  const downloadUrl: TDownloadAnimeUrl = { title: "", streamUrl: "", downloadUrl: [] };

  if (!page) return downloadUrl;

  const $ = cheerio.load(page.data);

  const title = $(`${type === "episode" ? ".download" : ".batchlink"} h4`).text();
  const streamUrl = $("iframe").attr("src") || "";

  // get anime download infos
  $(`${type === "episode" ? ".download" : ".batchlink"} ul li`).each((_, e) => {
    const resolution = $(e).find("strong").text();
    const size = $(e).find("i").text();

    const providers: TDownloadProvider[] = [];

    $(e)
      .find("a")
      .each((_, e) => {
        const provider = $(e).text();
        const href = $(e).attr("href") || "";
        providers.push({ provider, href });
      });

    downloadUrl.downloadUrl.push({ resolution, providers: providers, size });
  });

  // populate title & stream url
  downloadUrl.title = title;
  downloadUrl.streamUrl = streamUrl;

  return downloadUrl;
}
