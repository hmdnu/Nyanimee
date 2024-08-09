import * as cheerio from "cheerio";
import { TDownloadAnimeUrl, TDownloadProvider } from "~/types";
import { Env } from "~/utils/env";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { fetch, Response } from "~/utils";

export class DownloadAnime extends AnimeStructure<TDownloadAnimeUrl> {
  protected extractHTML(html: string, type: string): TDownloadAnimeUrl {
    const downloadUrl: TDownloadAnimeUrl = { title: "", streamUrl: "", downloadUrl: [] };

    const $ = cheerio.load(html);

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

  async get(type: string, animeEpisode: string): Promise<Response> {
    const page = await fetch(`${Env.baseUrl}/${type}/${animeEpisode}`);

    const anime = this.extractHTML(String(page?.data), type);

    return new Response(200, "ok", anime);
  }
}
